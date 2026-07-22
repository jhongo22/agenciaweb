import { workflow, node, trigger, ifElse, expr } from '@n8n/workflow-sdk';

const SHEET_ID = '1JZ7JmokcAAhXiig3yvj5HBA7R3WhWF2sJqsGUBwH2yI';

const start = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Start' }
});

const readPendingQuery = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Read Pending Query',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Queries' },
      filtersUI: {
        values: [
          { lookupColumn: 'estado ', lookupValue: 'pending' }
        ]
      },
      combineFilters: 'AND',
      options: {
        dataLocationOnSheet: { values: { rangeDefinition: 'detectAutomatically', readRowsUntil: 'lastRowInSheet' } },
        returnFirstMatch: true
      }
    },
    output: [{ categoria: 'inmobiliarias', ubicacion: 'Medellín', estado: 'pending', fecha: '2026-07-21' }]
  }
});

const hasQuery = ifElse({
  version: 2.3,
  config: {
    name: 'Has Query?',
    parameters: {
      conditions: {
        combinator: 'and',
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [
          { leftValue: expr('{{ $input.all().length }}'), operator: { type: 'number', operation: 'larger' }, rightValue: 0 }
        ]
      }
    }
  }
});

const noOp = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: { name: 'No Pending Queries' }
});

const markProcessing = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Mark Processing',
    parameters: {
      resource: 'sheet',
      operation: 'appendOrUpdate',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Queries' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'categoria ': expr('{{ $json["categoria "] }}'),
          'ubicacion': expr('{{ $json.ubicacion }}'),
          'estado ': 'processing',
          'fecha': expr('{{ $json.fecha }}')
        },
        matchingColumns: ['categoria ', 'ubicacion'],
        schema: [
          { id: 'categoria ', displayName: 'categoria ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'ubicacion', displayName: 'ubicacion', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'estado ', displayName: 'estado ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'fecha', displayName: 'fecha', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false }
        ]
      }
    },
    output: [{ categoria: 'inmobiliarias', ubicacion: 'Medellín', estado: 'processing' }]
  }
});

const startApify = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Start Apify Scraping Job',
    parameters: {
      method: 'POST',
      url: 'https://api.apify.com/v2/acts/compass~crawler-google-places/runs?token={{ $env.APIFY_TOKEN }}',
      authentication: 'none',
      sendHeaders: true,
      headerParameters: {
        parameters: [
          { name: 'Content-Type', value: 'application/json' },
          { name: 'Accept', value: 'application/json' }
        ]
      },
      sendBody: true,
      specifyBody: 'json',
      jsonBody: expr('{\n  "searchStringsArray": [{{ $json["categoria "] }}],\n  "locationQuery": "{{ $json.ubicacion }}",\n  "maxCrawledPlacesPerSearch": 2,\n  "language": "es"\n}')
    },
    output: [{ data: { id: 'abc123' } }]
  }
});

const waitForJob = node({
  type: 'n8n-nodes-base.wait',
  version: 1.1,
  config: {
    name: 'Wait for Job Succeed',
    parameters: {
      resume: 'timeInterval',
      amount: 5,
      unit: 'seconds'
    }
  }
});

const checkStatus = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Check Scraping Status',
    parameters: {
      method: 'GET',
      url: expr('https://api.apify.com/v2/actor-runs/{{ $json.data.id }}'),
      authentication: 'none',
      options: { timeout: 10000 }
    },
    output: [{ data: { status: 'SUCCEEDED', defaultDatasetId: 'ds_123' } }]
  }
});

const loopUntilComplete = ifElse({
  version: 2.3,
  config: {
    name: 'Loop Until Complete',
    parameters: {
      conditions: {
        combinator: 'and',
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [
          { leftValue: expr('{{ $json.data.status }}'), operator: { type: 'string', operation: 'notEquals' }, rightValue: 'SUCCEEDED' }
        ]
      },
      looseTypeValidation: true
    }
  }
});

const fetchResults = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Fetch Scraped Results',
    parameters: {
      method: 'GET',
      url: expr('https://api.apify.com/v2/datasets/{{ $json.data.defaultDatasetId }}/items'),
      authentication: 'none',
      options: { timeout: 10000 }
    },
    output: [{ title: 'Restaurante Ejemplo', category: 'Restaurante', address: 'Calle 123', phone: '+57 300 000 0000', website: 'https://ejemplo.com' }]
  }
});

const formatResults = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Format Results',
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const categoriaBuscada = $('Mark Processing').item.json["categoria "];
const ubicacion = $('Mark Processing').item.json["ubicacion"];
const now = new Date().toISOString().split('T')[0];

const leads = $input.all().map(item => {
  const p = item.json;
  const phone = (p.phone || p.phoneNumber || '').toString().trim();
  const website = (p.website || p.webAddress || '').toString().trim();

  return {
    categoriaBuscada: categoriaBuscada + ' - ' + ubicacion,
    nombre: (p.title || '').toString().trim(),
    categoria: (p.category || p.categories || '').toString().trim(),
    direccion: (p.address || p.street || '').toString().trim(),
    telefono: phone.startsWith('+57') ? phone.substring(3) : phone,
    sitioWeb: website,
    rating: p.totalScore || p.rating || '',
    correo: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    tiktok: '',
    twitter: '',
    palabrasClave: '',
    descripcion: '',
    calificacion: '',
    qualificado: '',
    estado: 'nuevo',
    fechaCaptura: now
  };
});

return leads;`
    },
    output: [{ nombre: 'Restaurante Ejemplo', categoriaBuscada: 'inmobiliarias - Medellín', categoria: 'Restaurante', direccion: 'Calle 123', telefono: '3001234567', sitioWeb: 'https://ejemplo.com', rating: '4.5', correo: '', whatsapp: '', instagram: '', facebook: '', linkedin: '', tiktok: '', twitter: '', palabrasClave: '', descripcion: '', calificacion: '', qualificado: '', estado: 'nuevo', fechaCaptura: '2026-07-21' }]
  }
});

const appendToLeads = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Append to Leads',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'categoriaBuscada': expr('{{ $json.categoriaBuscada }}'),
          'nombre': expr('{{ $json.nombre }}'),
          'categoria ': expr('{{ $json.categoria }}'),
          'direccion': expr('{{ $json.direccion }}'),
          ' telefono ': expr('{{ $json.telefono }}'),
          'sitioWeb': expr('{{ $json.sitioWeb }}'),
          'rating ': expr('{{ $json.rating }}'),
          'correo ': expr('{{ $json.correo }}'),
          'whatsapp ': expr('{{ $json.whatsapp }}'),
          'instagram ': expr('{{ $json.instagram }}'),
          'facebook ': expr('{{ $json.facebook }}'),
          'linkedin': expr('{{ $json.linkedin }}'),
          'tiktok ': expr('{{ $json.tiktok }}'),
          'twitter': expr('{{ $json.twitter }}'),
          ' palabrasClave': expr('{{ $json.palabrasClave }}'),
          'descripcion': expr('{{ $json.descripcion }}'),
          'calificacion': expr('{{ $json.calificacion }}'),
          'qualificado': expr('{{ $json.qualificado }}'),
          'estado ': expr('{{ $json.estado }}'),
          'fechaCaptura': expr('{{ $json.fechaCaptura }}')
        },
        schema: [
          { id: 'categoriaBuscada', displayName: 'categoriaBuscada', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'nombre', displayName: 'nombre', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'categoria ', displayName: 'categoria ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'direccion', displayName: 'direccion', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: ' telefono ', displayName: ' telefono ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'sitioWeb', displayName: 'sitioWeb', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'rating ', displayName: 'rating ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'correo ', displayName: 'correo ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'whatsapp ', displayName: 'whatsapp ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'instagram ', displayName: 'instagram ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'facebook ', displayName: 'facebook ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'linkedin', displayName: 'linkedin', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'tiktok ', displayName: 'tiktok ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'twitter', displayName: 'twitter', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: ' palabrasClave', displayName: ' palabrasClave', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'descripcion', displayName: 'descripcion', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'calificacion', displayName: 'calificacion', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'qualificado', displayName: 'qualificado', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'estado ', displayName: 'estado ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'fechaCaptura', displayName: 'fechaCaptura', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false }
        ]
      }
    },
    output: [{ nombre: 'Restaurante Ejemplo', categoriaBuscada: 'inmobiliarias - Medellín', estado: 'nuevo', fechaCaptura: '2026-07-21' }]
  }
});

const markDone = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Mark Done',
    parameters: {
      resource: 'sheet',
      operation: 'appendOrUpdate',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Queries' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'categoria ': expr('{{ $("Read Pending Query").item.json["categoria "] }}'),
          'ubicacion': expr('{{ $("Read Pending Query").item.json.ubicacion }}'),
          'estado ': 'done',
          'fecha': expr('{{ $("Read Pending Query").item.json.fecha }}')
        },
        matchingColumns: ['categoria ', 'ubicacion'],
        schema: [
          { id: 'categoria ', displayName: 'categoria ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'ubicacion', displayName: 'ubicacion', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'estado ', displayName: 'estado ', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false },
          { id: 'fecha', displayName: 'fecha', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: false }
        ]
      }
    },
    output: [{ categoria: 'inmobiliarias', ubicacion: 'Medellín', estado: 'done', fecha: '2026-07-21' }]
  }
});

const loopBack = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Loop Back',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'continuar', name: 'continuar', value: 'Si', type: 'string' }
        ]
      }
    },
    output: [{ continuar: 'Si' }]
  }
});

export default workflow('AGENTE DE PROSPECCION V2', 'AGENTE DE PROSPECCION V2')
  .add(start)
  .to(readPendingQuery)
  .to(hasQuery
    .onTrue(
      markProcessing
        .to(startApify)
        .to(waitForJob)
        .to(checkStatus)
        .to(loopUntilComplete.onTrue(waitForJob))
    )
    .onFalse(noOp)
  )
  .add(loopUntilComplete)
  .to(fetchResults)
  .to(formatResults)
  .to(appendToLeads)
  .to(markDone)
  .to(loopBack)
  .to(readPendingQuery);
