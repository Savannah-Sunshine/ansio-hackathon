<script lang="ts">
    import { onMount } from 'svelte';
  
    export let contributions = [];
  
    console.log(contributions);
  </script>
  
  <div>
    <h2>Savannah's GitHub Contribution Graph</h2>
  
    {#if contributions.length > 0}
      <div class="contribution-calendar">
        {#each contributions as week}
          <div class="week">
            {#each week.contributionDays as day}
              <div class="day" style="background-color: {day.color};">
                <span>{day.contributionCount}</span>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {:else}
      <p>Loading contribution data...</p>
    {/if}
  </div>
  
  <style>
    .contribution-calendar {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .week {
      display: flex;
      justify-content: space-between;
    }
  
    .day {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      font-size: 10px;
      color: #fff;
    }
  
    .day span {
      visibility: hidden; /* Hide numbers inside circles by default */
    }
  
    .day:hover span {
      visibility: visible; /* Show numbers when hovered */
    }
  </style>
  