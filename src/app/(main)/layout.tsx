import Script from 'next/script';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import WhatsAppButton from '@/components/widgets/WhatsAppButton';
import AiChatWidget from '@/components/widgets/AiChatWidget';
import Preloader from '@/components/effects/Preloader';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      <SmoothScrollProvider>
        <Navigation />
        {children}
        {/* ... */}
        <Footer />
        <AiChatWidget />
        <Script
          id="lazy-third-parties"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.chatwootSettings = {"position":"right","type":"standard","launcherTitle":""};
              
              (function() {
                var initialized = false;
                function initThirdParties() {
                  if (initialized) return;
                  initialized = true;
                  
                  window.removeEventListener('pointermove', initThirdParties);
                  window.removeEventListener('scroll', initThirdParties);
                  window.removeEventListener('touchstart', initThirdParties);
                  window.removeEventListener('keydown', initThirdParties);
                  
                  var gaScript = document.createElement('script');
                  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-W5P7806J2F';
                  gaScript.async = true;
                  document.head.appendChild(gaScript);
                  
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-W5P7806J2F');
                  
                  (function(d,t) {
                    var BASE_URL="https://chatwoot.autonomek.com";
                    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                    g.src=BASE_URL+"/packs/js/sdk.js";
                    g.async = true;
                    s.parentNode.insertBefore(g,s);
                    g.onload=function(){
                      window.chatwootSDK.run({
                        websiteToken: 'sgKYEgxKz4TFe6LqbeTCupQA',
                        baseUrl: BASE_URL
                      })
                    }
                  })(document,"script");
                }
                
                window.addEventListener('pointermove', initThirdParties, { passive: true });
                window.addEventListener('scroll', initThirdParties, { passive: true });
                window.addEventListener('touchstart', initThirdParties, { passive: true });
                window.addEventListener('keydown', initThirdParties, { passive: true });
                
                setTimeout(initThirdParties, 5000);
              })();
            `,
          }}
        />
        <WhatsAppButton />
      </SmoothScrollProvider>
    </>
  );
}
