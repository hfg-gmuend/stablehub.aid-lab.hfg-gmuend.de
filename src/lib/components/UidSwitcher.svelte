<script lang="ts">
  import { user } from '$lib/stores/user.js';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let isOpen = false;
  let newUid = '';
  
  // Reaktive Werte
  $: currentUid = $user.userid || 'default';
  
  function toggleDropdown() {
    isOpen = !isOpen;
    if (isOpen) {
      newUid = currentUid === 'default' ? '' : currentUid;
    }
  }
  
  function closeDropdown() {
    isOpen = false;
    newUid = '';
  }
  
  function handleUidChange() {
    const targetUid = newUid.trim() || 'default';
    
    if (targetUid !== currentUid) {
      user.setUserId(targetUid);
      dispatch('uidChanged', { newUid: targetUid, oldUid: currentUid });
    }
    
    closeDropdown();
  }
  
  function generateRandomUid() {
    const randomUid = 'user-' + Math.random().toString(36).substr(2, 9);
    newUid = randomUid;
  }
  
  // Schließe Dropdown bei Klick außerhalb
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Element;
    if (isOpen && !target.closest('.uid-switcher')) {
      closeDropdown();
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="uid-switcher">
  <button class="uid-button" on:click={toggleDropdown} class:active={isOpen}>
    <span class="uid-icon">👤</span>
    <span class="uid-text">{currentUid}</span>
    <span class="dropdown-arrow" class:rotated={isOpen}>▼</span>
  </button>
  
  {#if isOpen}
    <div class="uid-dropdown">
      <div class="dropdown-header">
        <h4>Switch Account</h4>
        <p>Change your User ID to access different saved images and settings.</p>
      </div>
      
      <div class="uid-input-group">
        <label for="uid-input">User ID:</label>
        <div class="input-container">
          <input 
            id="uid-input"
            type="text" 
            bind:value={newUid}
            placeholder="Enter User ID or leave empty for default"
            on:keydown={(e) => e.key === 'Enter' && handleUidChange()}
          />
          <button 
            class="random-button" 
            on:click={generateRandomUid}
            title="Generate random User ID"
          >
            🎲
          </button>
        </div>
      </div>
      
      <div class="dropdown-actions">
        <button class="cancel-button" on:click={closeDropdown}>
          Cancel
        </button>
        <button class="apply-button" on:click={handleUidChange}>
          Switch Account
        </button>
      </div>
      
      <div class="uid-info">
        <small>
          <strong>Current:</strong> {currentUid}<br>
          <strong>Note:</strong> Each User ID has its own saved images and favorites.
        </small>
      </div>
    </div>
  {/if}
</div>

<style>
  .uid-switcher {
    position: relative;
    display: inline-block;
  }
  
  .uid-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #2a2a2a;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 140px;
    justify-content: space-between;
  }
  
  .uid-button:hover {
    background-color: #333;
    border-color: #FCEA2B;
  }
  
  .uid-button.active {
    background-color: #333;
    border-color: #FCEA2B;
    box-shadow: 0 0 0 2px rgba(252, 234, 43, 0.2);
  }
  
  .uid-icon {
    font-size: 1rem;
    line-height: 1;
  }
  
  .uid-text {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80px;
  }
  
  .dropdown-arrow {
    font-size: 0.7rem;
    transition: transform 0.2s ease;
    line-height: 1;
  }
  
  .dropdown-arrow.rotated {
    transform: rotate(180deg);
  }
  
  .uid-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #1e1e1e;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 1rem;
    min-width: 280px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    margin-top: 0.5rem;
  }
  
  .dropdown-header {
    margin-bottom: 1rem;
  }
  
  .dropdown-header h4 {
    margin: 0 0 0.5rem 0;
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
  }
  
  .dropdown-header p {
    margin: 0;
    color: #b0b0b0;
    font-size: 0.85rem;
    line-height: 1.4;
  }
  
  .uid-input-group {
    margin-bottom: 1rem;
  }
  
  .uid-input-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #e0e0e0;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .input-container {
    display: flex;
    gap: 0.5rem;
  }
  
  .uid-input-group input {
    flex: 1;
    padding: 0.5rem;
    background-color: #2a2a2a;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    font-size: 0.9rem;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .uid-input-group input:focus {
    border-color: #FCEA2B;
    outline: none;
    box-shadow: 0 0 0 2px rgba(252, 234, 43, 0.2);
  }
  
  .random-button {
    background-color: #444;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 0.5rem;
    color: #e0e0e0;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 0.9rem;
    line-height: 1;
  }
  
  .random-button:hover {
    background-color: #555;
  }
  
  .dropdown-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .cancel-button,
  .apply-button {
    flex: 1;
    padding: 0.6rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .cancel-button {
    background-color: #444;
    border: 1px solid #666;
    color: #e0e0e0;
  }
  
  .cancel-button:hover {
    background-color: #555;
  }
  
  .apply-button {
    background-color: #FCEA2B;
    border: 1px solid #FCEA2B;
    color: #121212;
  }
  
  .apply-button:hover {
    background-color: #ffe566;
  }
  
  .uid-info {
    padding: 0.75rem;
    background-color: rgba(70, 70, 70, 0.3);
    border-radius: 4px;
    border-left: 3px solid #FCEA2B;
  }
  
  .uid-info small {
    color: #b0b0b0;
    font-size: 0.8rem;
    line-height: 1.4;
  }
</style>
