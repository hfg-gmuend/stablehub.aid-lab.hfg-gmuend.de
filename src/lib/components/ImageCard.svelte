<script>
  export let title = '';
  export let description = '';
  export let imageUrl = '';
  export let href = '/';
</script>

<a href={href} class="card">
  <div class="image-container">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
</a>

<style>
  .card {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s, box-shadow 0.3s;
    text-decoration: none;
    color: inherit;
    background-color: white;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .image-container {
    height: 320px; /* Noch größer gemacht für mehr Bildraum */
    overflow: hidden;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Wieder zurück zu cover, um die Kachel auszufüllen */
  }
  
  .content {
    padding: 1.5rem;
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
  }
  
  p {
    font-family: 'Inter', sans-serif;
    margin: 0;
    color: #6c757d;
  }
</style>
