<script lang="ts">
  import { base } from '$app/paths';

  // Props for customization
  export let title = "Powered by";
  export let subtitle = "Supported by institutions and organizations";
  export let visible = false;
  export let logos = [
    { src: `${base}/credit/bw.png`, alt: "Baden-Württemberg" },
    { src: `${base}/credit/DE.jpg`, alt: "Deutschland" },
    { src: `${base}/credit/hfg.svg`, alt: "HfG Gmünd" }
  ];
</script>

<section class="powered-by" class:visible>
  <div class="powered-by-header">
    <h2>{title}</h2>
    <p class="powered-by-subtitle">{subtitle}</p>
  </div>
  
  <div class="partner-logos">
    {#each logos as logo}
      <div class="partner-logo">
        <img src={logo.src} alt={logo.alt} />
      </div>
    {/each}
  </div>
</section>

<style>
  /* Powered by Section */
  .powered-by {
    margin: 6rem 0 8rem;
    padding: 4rem 2rem;
    text-align: center;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .powered-by.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .powered-by-header {
    margin-bottom: 4rem;
  }

  .powered-by-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #FCEA2B 0%, #F7DC6F 50%, #FCEA2B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #FCEA2B;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    position: relative;
    display: inline-block;
  }

  .powered-by-header h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #FCEA2B, transparent);
    border-radius: 2px;
    animation: glow-line 2s ease-in-out infinite;
  }

  @keyframes glow-line {
    0%, 100% {
      opacity: 0.6;
      transform: scaleX(0.8);
    }
    50% {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  .powered-by-subtitle {
    font-size: 1.1rem;
    color: #a0a0a0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }

  .partner-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .partner-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    border-radius: 20px;
    background: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(15px);
    height: 250px;
    width: 380px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .partner-logo:hover {
    background: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  .partner-logo img {
    max-height: 180px;
    max-width: 300px;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08));
  }

  .partner-logo:hover img {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.12));
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .partner-logos {
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }
    
    .partner-logo {
      width: 100%;
      max-width: 300px;
      height: 180px;
      padding: 2rem;
    }
    
    .partner-logo img {
      max-height: 100px;
      max-width: 200px;
    }
  }
</style>
