import { workflow, node, trigger, ifElse, splitInBatches, nextBatch, languageModel, outputParser, expr } from '@n8n/workflow-sdk';

const SHEET_ID = '1JZ7JmokcAAhXiig3yvj5HBA7R3WhWF2sJqsGUBwH2yI';

// =====================================================
// TRIGGER
// =====================================================
const start = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Start' }
});

// =====================================================
// PHASE 1: READ QUERY & APIFY SCRAPING
// =====================================================
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
      filtersUI: { values: [{ lookupColumn: 'estado ', lookupValue: 'pending' }] },
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
        conditions: [{ leftValue: expr('{{ $input.all().length }}'), operator: { type: 'number', operation: 'larger' }, rightValue: 0 }]
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
      headerParameters: { parameters: [{ name: 'Content-Type', value: 'application/json' }, { name: 'Accept', value: 'application/json' }] },
      sendBody: true,
      specifyBody: 'json',
      jsonBody: expr('{\n  "searchStringsArray": [{{ $json["categoria "] }}],\n  "locationQuery": "{{ $json.ubicacion }}",\n  "maxCrawledPlacesPerSearch": 2,\n  "language": "es"\n}')
    },
    output: [{ data: { id: 'abc123' } }]
  }
});

const waitApify = node({
  type: 'n8n-nodes-base.wait',
  version: 1.1,
  config: {
    name: 'Wait Apify',
    parameters: { resume: 'timeInterval', amount: 5, unit: 'seconds' }
  }
});

const checkApifyStatus = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Check Apify Status',
    parameters: {
      method: 'GET',
      url: expr('https://api.apify.com/v2/actor-runs/{{ $json.data.id }}'),
      authentication: 'none',
      options: { timeout: 10000 }
    },
    output: [{ data: { status: 'SUCCEEDED', defaultDatasetId: 'ds_123' } }]
  }
});

const loopApify = ifElse({
  version: 2.3,
  config: {
    name: 'Apify Done?',
    parameters: {
      conditions: {
        combinator: 'and',
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [{ leftValue: expr('{{ $json.data.status }}'), operator: { type: 'string', operation: 'notEquals' }, rightValue: 'SUCCEEDED' }]
      },
      looseTypeValidation: true
    }
  }
});

const fetchApifyResults = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Fetch Apify Results',
    parameters: {
      method: 'GET',
      url: expr('https://api.apify.com/v2/datasets/{{ $json.data.defaultDatasetId }}/items'),
      authentication: 'none',
      options: { timeout: 10000 }
    },
    output: [{ title: 'Restaurante Ejemplo', category: 'Restaurante', address: 'Calle 123', phone: '+57 300 000 0000', website: 'https://ejemplo.com' }]
  }
});

const formatNewLeads = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Format New Leads',
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const q = $('Mark Processing').item.json;
const cat = (q['categoria '] || '').trim();
const ubi = (q.ubicacion || '').trim();
const now = new Date().toISOString().split('T')[0];

const leads = $input.all().map(item => {
  const p = item.json;
  const phone = (p.phone || p.phoneNumber || '').toString().trim();
  const website = (p.website || p.webAddress || '').toString().trim();
  return {
    categoriaBuscada: cat + ' - ' + ubi,
    nombre: (p.title || '').toString().trim(),
    categoria: (p.category || p.categories || '').toString().trim(),
    direccion: (p.address || p.street || '').toString().trim(),
    telefono: phone.startsWith('+57') ? phone.substring(3) : phone,
    sitioWeb: website,
    rating: p.totalScore || p.rating || '',
    correo: '', whatsapp: '', instagram: '', facebook: '', linkedin: '', tiktok: '', twitter: '',
    palabrasClave: '', descripcion: '',
    calificacion: '', qualificado: '',
    estado: 'nuevo',
    fechaCaptura: now
  };
});
return leads;`
    },
    output: [{ nombre: 'Ejemplo', categoriaBuscada: 'inmobiliarias - Medellín', sitioWeb: 'https://ejemplo.com', estado: 'nuevo' }]
  }
});

const appendLeads = node({
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
          categoriaBuscada: expr('{{ $json.categoriaBuscada }}'),
          nombre: expr('{{ $json.nombre }}'),
          'categoria ': expr('{{ $json.categoria }}'),
          direccion: expr('{{ $json.direccion }}'),
          ' telefono ': expr('{{ $json.telefono }}'),
          sitioWeb: expr('{{ $json.sitioWeb }}'),
          'rating ': expr('{{ $json.rating }}'),
          'correo ': expr('{{ $json.correo }}'),
          'whatsapp ': expr('{{ $json.whatsapp }}'),
          'instagram ': expr('{{ $json.instagram }}'),
          'facebook ': expr('{{ $json.facebook }}'),
          linkedin: expr('{{ $json.linkedin }}'),
          'tiktok ': expr('{{ $json.tiktok }}'),
          twitter: expr('{{ $json.twitter }}'),
          ' palabrasClave': expr('{{ $json.palabrasClave }}'),
          descripcion: expr('{{ $json.descripcion }}'),
          calificacion: expr('{{ $json.calificacion }}'),
          qualificado: expr('{{ $json.qualificado }}'),
          'estado ': expr('{{ $json.estado }}'),
          fechaCaptura: expr('{{ $json.fechaCaptura }}')
        },
        schema: [
          { id: 'categoriaBuscada', displayName: 'categoriaBuscada', type: 'string' },
          { id: 'nombre', displayName: 'nombre', type: 'string' },
          { id: 'categoria ', displayName: 'categoria ', type: 'string' },
          { id: 'direccion', displayName: 'direccion', type: 'string' },
          { id: ' telefono ', displayName: ' telefono ', type: 'string' },
          { id: 'sitioWeb', displayName: 'sitioWeb', type: 'string' },
          { id: 'rating ', displayName: 'rating ', type: 'string' },
          { id: 'correo ', displayName: 'correo ', type: 'string' },
          { id: 'whatsapp ', displayName: 'whatsapp ', type: 'string' },
          { id: 'instagram ', displayName: 'instagram ', type: 'string' },
          { id: 'facebook ', displayName: 'facebook ', type: 'string' },
          { id: 'linkedin', displayName: 'linkedin', type: 'string' },
          { id: 'tiktok ', displayName: 'tiktok ', type: 'string' },
          { id: 'twitter', displayName: 'twitter', type: 'string' },
          { id: ' palabrasClave', displayName: ' palabrasClave', type: 'string' },
          { id: 'descripcion', displayName: 'descripcion', type: 'string' },
          { id: 'calificacion', displayName: 'calificacion', type: 'string' },
          { id: 'qualificado', displayName: 'qualificado', type: 'string' },
          { id: 'estado ', displayName: 'estado ', type: 'string' },
          { id: 'fechaCaptura', displayName: 'fechaCaptura', type: 'string' }
        ]
      }
    },
    output: [{ nombre: 'Ejemplo', sitioWeb: 'https://ejemplo.com', estado: 'nuevo' }]
  }
});

const markQueryDone = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Mark Query Done',
    parameters: {
      resource: 'sheet',
      operation: 'appendOrUpdate',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Queries' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'categoria ': expr('{{ $("Read Pending Query").item.json["categoria "] }}'),
          ubicacion: expr('{{ $("Read Pending Query").item.json.ubicacion }}'),
          'estado ': 'done',
          fecha: expr('{{ $("Read Pending Query").item.json.fecha }}')
        },
        matchingColumns: ['categoria ', 'ubicacion'],
        schema: [
          { id: 'categoria ', displayName: 'categoria ', canBeUsedToMatch: true, type: 'string' },
          { id: 'ubicacion', displayName: 'ubicacion', canBeUsedToMatch: true, type: 'string' },
          { id: 'estado ', displayName: 'estado ', type: 'string' },
          { id: 'fecha', displayName: 'fecha', type: 'string' }
        ]
      }
    },
    output: [{ categoria: 'inmobiliarias', ubicacion: 'Medellín', estado: 'done' }]
  }
});

// =====================================================
// PHASE 2: FIRECRAWL ENRICHMENT
// =====================================================
const readLeadsToEnrich = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Read Leads to Enrich',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Leads' },
      options: {
        dataLocationOnSheet: { values: { rangeDefinition: 'detectAutomatically', readRowsUntil: 'lastRowInSheet' } },
        returnAllMatches: 'returnAllMatches'
      }
    },
    output: [{ nombre: 'Ejemplo', sitioWeb: 'https://ejemplo.com', 'estado ': 'nuevo' }]
  }
});

const filterWebLeads = node({
  type: 'n8n-nodes-base.filter',
  version: 2.3,
  config: {
    name: 'Filter Web Leads',
    parameters: {
      conditions: {
        combinator: 'and',
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [
          { leftValue: expr('{{ $json.sitioWeb }}'), operator: { type: 'string', operation: 'notEmpty' } },
          { leftValue: expr('{{ $json["estado "] }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'nuevo' }
        ]
      }
    }
  }
});

const batchFirecrawl = splitInBatches({
  version: 3,
  config: { name: 'Batch Firecrawl', parameters: { batchSize: 1 } }
});

const startFirecrawl = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  credentials: { httpHeaderAuth: { id: 'OJXeHlaykdFVwY0N', name: 'Firecrawl Jhon' } },
  config: {
    name: 'Start Firecrawl Extract',
    parameters: {
      method: 'POST',
      url: 'https://api.firecrawl.dev/v1/extract',
      authentication: 'genericCredentialType',
      genericAuthType: 'httpHeaderAuth',
      sendHeaders: true,
      headerParameters: { parameters: [{ name: 'Content-Type', value: 'application/json' }] },
      sendBody: true,
      specifyBody: 'json',
      jsonBody: expr('{\n  "urls": ["{{ $json.sitioWeb }}"],\n  "prompt": "Extrae de este sitio web: email de contacto, enlace de Instagram, enlace de Facebook, enlace de LinkedIn, enlace de TikTok, enlace de Twitter/X, número de WhatsApp, palabras clave del negocio, descripción breve del negocio",\n  "schema": {\n    "type": "object",\n    "properties": {\n      "email": { "type": "string" },\n      "instagram": { "type": "string" },\n      "facebook": { "type": "string" },\n      "linkedin": { "type": "string" },\n      "tiktok": { "type": "string" },\n      "twitter": { "type": "string" },\n      "whatsapp": { "type": "string" },\n      "palabrasClave": { "type": "string" },\n      "descripcion": { "type": "string" }\n    }\n  }\n}')
    },
    output: [{ id: 'extract-abc', success: true }]
  }
});

const waitFirecrawl = node({
  type: 'n8n-nodes-base.wait',
  version: 1.1,
  config: {
    name: 'Wait Firecrawl',
    parameters: { resume: 'timeInterval', amount: 10, unit: 'seconds' }
  }
});

const checkFirecrawl = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  credentials: { httpHeaderAuth: { id: 'OJXeHlaykdFVwY0N', name: 'Firecrawl Jhon' } },
  config: {
    name: 'Check Firecrawl Status',
    parameters: {
      method: 'GET',
      url: expr('https://api.firecrawl.dev/v1/extract/{{ $json.id }}'),
      authentication: 'genericCredentialType',
      genericAuthType: 'httpHeaderAuth',
      options: { timeout: 10000 }
    },
    output: [{ status: 'completed', data: { email: 'info@ejemplo.com', instagram: 'https://instagram.com/ejemplo' }, success: true }]
  }
});

const firecrawlPending = ifElse({
  version: 2.3,
  config: {
    name: 'Firecrawl Pending?',
    parameters: {
      conditions: {
        combinator: 'and',
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [
          { leftValue: expr('{{ $json.status }}'), operator: { type: 'string', operation: 'notEquals' }, rightValue: 'completed' }
        ]
      }
    }
  }
});

const firecrawlError = ifElse({
  version: 2.3,
  config: {
    name: 'Firecrawl Error?',
    parameters: {
      conditions: {
        combinator: 'and',
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [
          { leftValue: expr('{{ $json.success }}'), operator: { type: 'boolean', operation: 'equals' }, rightValue: false }
        ]
      }
    }
  }
});

const extractFirecrawlData = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Extract Firecrawl Data',
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const fcData = $json.data || {};
const enriched = {
  correo: fcData.email || '',
  whatsapp: fcData.whatsapp || '',
  instagram: fcData.instagram || '',
  facebook: fcData.facebook || '',
  linkedin: fcData.linkedin || '',
  tiktok: fcData.tiktok || '',
  twitter: fcData.twitter || '',
  palabrasClave: fcData.palabrasClave || '',
  descripcion: fcData.descripcion || '',
  estado: 'enriquecido'
};
// Keep original fields from batch input
const orig = $('Batch Firecrawl').item.json;
return [{ ...orig, ...enriched }];`
    },
    output: [{ nombre: 'Ejemplo', sitioWeb: 'https://ejemplo.com', correo: 'info@ejemplo.com', estado: 'enriquecido' }]
  }
});

const updateEnrichedLead = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Update Enriched Lead',
    parameters: {
      resource: 'sheet',
      operation: 'appendOrUpdate',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          nombre: expr('{{ $json.nombre }}'),
          sitioWeb: expr('{{ $json.sitioWeb }}'),
          'correo ': expr('{{ $json.correo }}'),
          'whatsapp ': expr('{{ $json.whatsapp }}'),
          'instagram ': expr('{{ $json.instagram }}'),
          'facebook ': expr('{{ $json.facebook }}'),
          linkedin: expr('{{ $json.linkedin }}'),
          'tiktok ': expr('{{ $json.tiktok }}'),
          twitter: expr('{{ $json.twitter }}'),
          ' palabrasClave': expr('{{ $json.palabrasClave }}'),
          descripcion: expr('{{ $json.descripcion }}'),
          'estado ': expr('{{ $json.estado }}')
        },
        matchingColumns: ['nombre', 'sitioWeb'],
        schema: [
          { id: 'nombre', displayName: 'nombre', canBeUsedToMatch: true, type: 'string' },
          { id: 'sitioWeb', displayName: 'sitioWeb', canBeUsedToMatch: true, type: 'string' },
          { id: 'correo ', displayName: 'correo ', type: 'string' },
          { id: 'whatsapp ', displayName: 'whatsapp ', type: 'string' },
          { id: 'instagram ', displayName: 'instagram ', type: 'string' },
          { id: 'facebook ', displayName: 'facebook ', type: 'string' },
          { id: 'linkedin', displayName: 'linkedin', type: 'string' },
          { id: 'tiktok ', displayName: 'tiktok ', type: 'string' },
          { id: 'twitter', displayName: 'twitter', type: 'string' },
          { id: ' palabrasClave', displayName: ' palabrasClave', type: 'string' },
          { id: 'descripcion', displayName: 'descripcion', type: 'string' },
          { id: 'estado ', displayName: 'estado ', type: 'string' }
        ]
      }
    },
    output: [{ nombre: 'Ejemplo', estado: 'enriquecido' }]
  }
});

// =====================================================
// PHASE 3: SCORING
// =====================================================
const readAllLeads = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Read All Leads',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Leads' },
      options: {
        dataLocationOnSheet: { values: { rangeDefinition: 'detectAutomatically', readRowsUntil: 'lastRowInSheet' } },
        returnAllMatches: 'returnAllMatches'
      }
    },
    output: [{ nombre: 'Ejemplo', sitioWeb: 'https://ejemplo.com', 'correo ': 'info@ejemplo.com', 'estado ': 'enriquecido' }]
  }
});

const scoreLeads = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Score Leads',
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `return $input.all().map(item => {
  const d = item.json;
  let score = 0;
  if (d.sitioWeb) score += 1;
  if (d['correo '] || d.correo) score += 1.5;
  if (d.linkedin) score += 0.5;
  if (d['instagram '] || d.instagram) score += 0.5;
  if (d[' palabrasClave'] || d.palabrasClave) score += 1;
  if (d['categoria '] || d.categoria) score += 0.5;
  if (d['rating '] && parseFloat(d['rating ']) >= 3) score += 0.5;
  score = Math.min(score, 5);
  return {
    ...d,
    calificacion: score.toString(),
    qualificado: score >= 3 ? 'Si' : 'No'
  };
});`
    },
    output: [{ nombre: 'Ejemplo', calificacion: '3.5', qualificado: 'Si' }]
  }
});

const batchScoring = splitInBatches({
  version: 3,
  config: { name: 'Batch Scoring', parameters: { batchSize: 1 } }
});

const updateScore = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Update Score',
    parameters: {
      resource: 'sheet',
      operation: 'appendOrUpdate',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          nombre: expr('{{ $json.nombre }}'),
          sitioWeb: expr('{{ $json.sitioWeb }}'),
          calificacion: expr('{{ $json.calificacion }}'),
          qualificado: expr('{{ $json.qualificado }}')
        },
        matchingColumns: ['nombre', 'sitioWeb'],
        schema: [
          { id: 'nombre', displayName: 'nombre', canBeUsedToMatch: true, type: 'string' },
          { id: 'sitioWeb', displayName: 'sitioWeb', canBeUsedToMatch: true, type: 'string' },
          { id: 'calificacion', displayName: 'calificacion', type: 'string' },
          { id: 'qualificado', displayName: 'qualificado', type: 'string' }
        ]
      }
    },
    output: [{ nombre: 'Ejemplo', calificacion: '3.5', qualificado: 'Si' }]
  }
});

// =====================================================
// PHASE 4: BEST LEADS
// =====================================================
const filterQualified = node({
  type: 'n8n-nodes-base.filter',
  version: 2.3,
  config: {
    name: 'Filter Qualified',
    parameters: {
      conditions: {
        combinator: 'and',
        options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [
          { leftValue: expr('{{ $json.qualificado }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'Si' }
        ]
      }
    }
  }
});

const appendBestLeads = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Append Best Leads',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Best leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          categoriaBuscada: expr('{{ $json.categoriaBuscada }}'),
          nombre: expr('{{ $json.nombre }}'),
          sitioWeb: expr('{{ $json.sitioWeb }}'),
          'correo ': expr('{{ $json["correo "] }}'),
          'instagram ': expr('{{ $json["instagram "] }}'),
          calificacion: expr('{{ $json.calificacion }}'),
          email_1_asunto: '',
          email_1_cuerpo: '',
          email_2_asunto: '',
          email_2_cuerpo: '',
          email_3_asunto: '',
          email_3_cuerpo: '',
          ig_1: '',
          ig_2: '',
          ig_3: '',
          estadoEnvio: 'pendiente',
          fecha: expr('{{ $json.fechaCaptura }}')
        },
        schema: [
          { id: 'categoriaBuscada', displayName: 'categoriaBuscada', type: 'string' },
          { id: 'nombre', displayName: 'nombre', type: 'string' },
          { id: 'sitioWeb', displayName: 'sitioWeb', type: 'string' },
          { id: 'correo ', displayName: 'correo ', type: 'string' },
          { id: 'instagram ', displayName: 'instagram ', type: 'string' },
          { id: 'calificacion', displayName: 'calificacion', type: 'string' },
          { id: 'email_1_asunto', displayName: 'email_1_asunto', type: 'string' },
          { id: 'email_1_cuerpo', displayName: 'email_1_cuerpo', type: 'string' },
          { id: 'email_2_asunto', displayName: 'email_2_asunto', type: 'string' },
          { id: 'email_2_cuerpo', displayName: 'email_2_cuerpo', type: 'string' },
          { id: 'email_3_asunto', displayName: 'email_3_asunto', type: 'string' },
          { id: 'email_3_cuerpo', displayName: 'email_3_cuerpo', type: 'string' },
          { id: 'ig_1', displayName: 'ig_1', type: 'string' },
          { id: 'ig_2', displayName: 'ig_2', type: 'string' },
          { id: 'ig_3', displayName: 'ig_3', type: 'string' },
          { id: 'estadoEnvio', displayName: 'estadoEnvio', type: 'string' },
          { id: 'fecha', displayName: 'fecha', type: 'string' }
        ]
      }
    },
    output: [{ nombre: 'Ejemplo', estadoEnvio: 'pendiente' }]
  }
});

// =====================================================
// PHASE 5: MESSAGE CONSTRUCTION (via OpenRouter)
// =====================================================
const batchMessages = splitInBatches({
  version: 3,
  config: { name: 'Batch Messages', parameters: { batchSize: 1 } }
});

const openRouterModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'OpenRouter Model',
    parameters: {
      model: { __rl: true, mode: 'id', value: 'openai/gpt-4o' },
      options: { baseURL: 'https://openrouter.ai/api/v1', temperature: 0.7 }
    },
    credentials: { openAiApi: { id: 'JSpNPK5LOvJfwHio', name: 'Openrouter sergioramos2ew3' } }
  }
});

const structuredParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: JSON.stringify({
        email_1_asunto: 'string',
        email_1_cuerpo: 'string',
        email_2_asunto: 'string',
        email_2_cuerpo: 'string',
        email_3_asunto: 'string',
        email_3_cuerpo: 'string',
        ig_1: 'string',
        ig_2: 'string',
        ig_3: 'string'
      })
    }
  }
});

const generateMessages = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'Generate Messages',
    parameters: {
      promptType: 'define',
      text: expr('Genera mensajes de prospección B2B para este lead:\n\nNombre: {{ $json.nombre }}\nSitio web: {{ $json.sitioWeb }}\nCategoría: {{ $json["categoria "] }}\nPalabras clave: {{ $json[" palabrasClave"] }}\nDescripción: {{ $json.descripcion }}'),
      hasOutputParser: true,
      options: {
        systemMessage: 'Eres un asistente experto en prospección B2B para una agencia de automatización e IA llamada Autonomek en Medellín, Colombia. Genera SIEMPRE en español (Colombia), tono profesional pero cercano.\n\nPara cada lead genera:\n- 3 correos electrónicos (asunto + cuerpo) con diferentes ángulos\n- 3 mensajes para Instagram DM (cortos, directos)\n\nLos mensajes deben:\n1. Mencionar el nombre del lead/empresa\n2. Referenciar su sector (inmobiliario/construcción)\n3. Explicar cómo Autonomek ayuda (automatización con IA, chatbots, desarrollo web, prospección B2B)\n4. Incluir llamado a la acción\n5. Ser progresivos: 1er email suave, 2do más directo, 3ro con urgencia',
        maxIterations: 5
      }
    },
    subnodes: { model: openRouterModel, outputParser: structuredParser }
  }
});

const extractMessages = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Extract Messages',
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const msgs = $json.output || {};
const orig = $('Batch Messages').item.json;
return [{
  ...orig,
  email_1_asunto: msgs.email_1_asunto || '',
  email_1_cuerpo: msgs.email_1_cuerpo || '',
  email_2_asunto: msgs.email_2_asunto || '',
  email_2_cuerpo: msgs.email_2_cuerpo || '',
  email_3_asunto: msgs.email_3_asunto || '',
  email_3_cuerpo: msgs.email_3_cuerpo || '',
  ig_1: msgs.ig_1 || '',
  ig_2: msgs.ig_2 || '',
  ig_3: msgs.ig_3 || '',
  estadoEnvio: 'mensajes_listos'
}];`
    },
    output: [{ nombre: 'Ejemplo', email_1_asunto: 'Oferta especial', estadoEnvio: 'mensajes_listos' }]
  }
});

const updateBestLeadMsgs = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  credentials: { googleSheetsOAuth2Api: { id: 'xLgMsMdyFYEUjeZU', name: 'Sheets Jhon' } },
  config: {
    name: 'Update Best Lead Msgs',
    parameters: {
      resource: 'sheet',
      operation: 'appendOrUpdate',
      documentId: { __rl: true, mode: 'id', value: SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Best leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          nombre: expr('{{ $json.nombre }}'),
          sitioWeb: expr('{{ $json.sitioWeb }}'),
          email_1_asunto: expr('{{ $json.email_1_asunto }}'),
          email_1_cuerpo: expr('{{ $json.email_1_cuerpo }}'),
          email_2_asunto: expr('{{ $json.email_2_asunto }}'),
          email_2_cuerpo: expr('{{ $json.email_2_cuerpo }}'),
          email_3_asunto: expr('{{ $json.email_3_asunto }}'),
          email_3_cuerpo: expr('{{ $json.email_3_cuerpo }}'),
          ig_1: expr('{{ $json.ig_1 }}'),
          ig_2: expr('{{ $json.ig_2 }}'),
          ig_3: expr('{{ $json.ig_3 }}'),
          estadoEnvio: expr('{{ $json.estadoEnvio }}')
        },
        matchingColumns: ['nombre', 'sitioWeb'],
        schema: [
          { id: 'nombre', displayName: 'nombre', canBeUsedToMatch: true, type: 'string' },
          { id: 'sitioWeb', displayName: 'sitioWeb', canBeUsedToMatch: true, type: 'string' },
          { id: 'email_1_asunto', displayName: 'email_1_asunto', type: 'string' },
          { id: 'email_1_cuerpo', displayName: 'email_1_cuerpo', type: 'string' },
          { id: 'email_2_asunto', displayName: 'email_2_asunto', type: 'string' },
          { id: 'email_2_cuerpo', displayName: 'email_2_cuerpo', type: 'string' },
          { id: 'email_3_asunto', displayName: 'email_3_asunto', type: 'string' },
          { id: 'email_3_cuerpo', displayName: 'email_3_cuerpo', type: 'string' },
          { id: 'ig_1', displayName: 'ig_1', type: 'string' },
          { id: 'ig_2', displayName: 'ig_2', type: 'string' },
          { id: 'ig_3', displayName: 'ig_3', type: 'string' },
          { id: 'estadoEnvio', displayName: 'estadoEnvio', type: 'string' }
        ]
      }
    },
    output: [{ nombre: 'Ejemplo', email_1_asunto: 'Oferta', estadoEnvio: 'mensajes_listos' }]
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
      assignments: { assignments: [{ id: 'continuar', name: 'continuar', value: 'Si', type: 'string' }] }
    },
    output: [{ continuar: 'Si' }]
  }
});

export default workflow('AGENTE DE PROSPECCION V2', 'AGENTE DE PROSPECCION V2')
  // PHASE 1: Query → Apify → Leads
  .add(start)
  .to(readPendingQuery)
  .to(hasQuery
    .onTrue(
      markProcessing
        .to(startApify)
        .to(waitApify)
        .to(checkApifyStatus)
        .to(loopApify.onTrue(waitApify))
    )
    .onFalse(noOp)
  )
  .add(loopApify)
  .to(fetchApifyResults)
  .to(formatNewLeads)
  .to(appendLeads)
  .to(markQueryDone)
  // PHASE 2: Firecrawl enrichment
  .to(readLeadsToEnrich)
  .to(filterWebLeads)
  .to(batchFirecrawl
    .onEachBatch(
      startFirecrawl
        .to(waitFirecrawl)
        .to(checkFirecrawl)
        .to(firecrawlPending.onTrue(waitFirecrawl))
    )
  )
  .add(firecrawlPending)
  .to(firecrawlError
    .onTrue(extractFirecrawlData)
    .onFalse(extractFirecrawlData)
  )
  .add(extractFirecrawlData)
  .to(updateEnrichedLead)
  .to(nextBatch(batchFirecrawl))
  // PHASE 3: Scoring
  .add(batchFirecrawl)
  .to(readAllLeads)
  .to(scoreLeads)
  .to(batchScoring
    .onEachBatch(updateScore.to(nextBatch(batchScoring)))
  )
  // PHASE 4: Best leads
  .add(batchScoring)
  .to(filterQualified)
  .to(appendBestLeads)
  .to(batchMessages
    .onEachBatch(
      generateMessages
        .to(extractMessages)
        .to(updateBestLeadMsgs)
        .to(nextBatch(batchMessages))
    )
    .onDone(loopBack)
  )
  .to(readPendingQuery);
