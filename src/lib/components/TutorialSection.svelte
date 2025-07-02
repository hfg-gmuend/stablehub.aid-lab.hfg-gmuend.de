<script>
  import { base } from "$app/paths";
  import TutorialHighlightCard from "$lib/components/uicomponents/TutorialHighlightCard.svelte";

  export let visible = false;
</script>

<!-- Tutorial-Teaser-Abschnitt -->
<section class="tutorials-teaser" class:visible>
  <div class="tutorials-header">
    <h2>New here? Start with our tutorials</h2>
    <p class="tutorials-subtitle">Master AI image generation with our step-by-step guides</p>
  </div>
  
  <div class="tutorial-highlights">
    <TutorialHighlightCard
      icon="/icon/rocket.svg"
      title="Quick Start"
      description="Learn the basics of Stable Diffusion in just 10 minutes"
      href="{base}/guided-tutorial/stable-diffusion-intro"
      linkText="Start now"
    />

    <TutorialHighlightCard
      icon="/icon/idea.svg"
      title="Prompt Power"
      description="Better prompts lead to better results"
      href="{base}/guided-tutorial/prompt-basics"
      linkText="Discover tips"
    />

    <TutorialHighlightCard
      icon="/icon/tool.svg"
      title="For Advanced Users"
      description="Parameters, styles and advanced techniques"
      href="{base}/guided-tutorial/core-parameters"
      linkText="Go deeper"
    />
  </div>

  <!-- Tutorial CTA -->
  <div class="tutorial-cta-simple">
    <a href="{base}/guided-tutorial" class="cta-link">
      <span>View all tutorials</span>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  </div>
</section>

<style>
  /* Enhanced Tutorial Section Animations */
  .tutorials-teaser {
    margin: 6rem 0 4rem 0;
    padding-top: 0;
    border-top: none;
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s ease-out;
    position: relative;
  }

  .tutorials-teaser::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(252, 234, 43, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .tutorials-teaser.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .tutorials-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .tutorials-header h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #f0f0f0;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #f0f0f0 0%, #FCEA2B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .tutorials-header h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FCEA2B, transparent);
    animation: underlineGlow 3s ease-in-out infinite;
  }

  @keyframes underlineGlow {
    0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
    50% { opacity: 1; transform: translateX(-50%) scaleX(1.2); }
  }

  .tutorials-subtitle {
    font-size: 1.1rem;
    color: #a0a0a0;
    margin-bottom: 0;
  }

  .tutorial-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
  }

  /* Tutorial CTA */
  .tutorial-cta-simple {
    text-align: center;
    margin-top: 3rem;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    background: rgba(252, 234, 43, 0.08);
    color: #FCEA2B;
    text-decoration: none;
    border: 1px solid rgba(252, 234, 43, 0.2);
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .cta-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .cta-link:hover::before {
    left: 100%;
  }

  .cta-link:hover {
    background: rgba(252, 234, 43, 0.12);
    border-color: rgba(252, 234, 43, 0.3);
    transform: translateY(-2px);
  }

  .cta-link svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .cta-link:hover svg {
    transform: translateX(4px);
  }

  /* Enhanced Tutorial Card Animations */
  .tutorial-highlights :global(.tutorial-card) {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
  }

  .tutorial-highlights :global(.tutorial-card::before) {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.08), transparent);
    transition: left 0.6s ease;
    z-index: 0;
  }

  .tutorial-highlights :global(.tutorial-card:hover::before) {
    left: 100%;
  }

  .tutorial-highlights :global(.tutorial-card:hover) {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }

  /* Staggered tutorial card animations */
  .tutorials-teaser.visible .tutorial-highlights :global(.tutorial-card:nth-child(1)) {
    animation: slideInCard 0.8s ease-out 0.2s both;
  }

  .tutorials-teaser.visible .tutorial-highlights :global(.tutorial-card:nth-child(2)) {
    animation: slideInCard 0.8s ease-out 0.4s both;
  }

  .tutorials-teaser.visible .tutorial-highlights :global(.tutorial-card:nth-child(3)) {
    animation: slideInCard 0.8s ease-out 0.6s both;
  }

  @keyframes slideInCard {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .tutorial-highlights {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
