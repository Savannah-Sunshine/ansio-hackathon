<script>
    // Props to accept data for the timeline
    export let items = [];
</script>

<style>
    /* General styles for the timeline container */
    .timeline {
        position: relative;
        margin: 20px auto;
        padding: 20px 0;
        width: 80%;
        max-width: 800px;
        border-left: 2px solid #ccc; /* The timeline line */
    }

    /* Individual timeline item */
    .timeline-item {
        position: relative;
        margin: 20px 0;
        padding-left: 20px; /* Space for the timeline line */
    }

    /* Circle indicator on the timeline */
    .timeline-item::before {
        content: '';
        position: absolute;
        left: -9px; /* Centers circle on the timeline line */
        top: 10px;
        width: 18px;
        height: 18px;
        background-color: var(--color-theme-2);
        border: 3px solid #007bff; /* Circle color */
        border-radius: 50%;
        z-index: 1;
    }

    /* Timeline content container */
    .timeline-content {
        display: flex;
        align-items: top;
        gap: 20px; /* Space between image and description */
        padding: 10px 20px;
        background-color: var(--color-bg-2);
        /* border: 1px solid #ccc; */
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    /* Image styles */
    .timeline-content img {
        max-width: 100px; /* Set a max width for the image */
        border-radius: 8px; /* Rounded corners */
        object-fit: cover;
        margin-top: 30px;
    }

    /* Description styles */
    .timeline-content .description {
        flex: 1;
        font-size: 16px;
        line-height: 1.6;
        color: var(--color-text);
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .timeline-content {
            flex-direction: column; /* Stack image and description vertically */
            align-items: flex-start;
        }
    }

    .description h2 {
        font-size: 1.5rem;
        margin: 0;
        font-weight: 600;
    }

    .position {
        font-style: italic;
        color: var(--color-text-2);
        margin: 0;
    }

    .date-location {
        margin: 0px;
    }

    .dates {
        font-size: 1em;
        color: var(--color-text-2);
        margin: 0;
    }
    /* .length {
        font-size: 1em;
        color: #777;
        text-align: right;
    } */

    .location {
        font-size: 1em;
        color: var(--color-text-2);
        margin-top: 10px;
    }

    /* .description-text {
        font-size: 1em;
        color: #333;
        margin-top: 15px;
        line-height: 1.6;
    }

    .description-text::before {
        content: "• ";
        color: #ff6347; /* Tomato red for bullet point 
    } */
</style>

<div class="timeline">
    {#each items as item}
        <div class="timeline-item">
            <div class="timeline-content">
                <!-- <img src={item.image} alt={item.title + " Logo"}> -->
                 <img
                    height="32"
                    width="32"
                    src={`https://unpkg.com/simple-icons@v13/icons/${item.company.toLowerCase().replace(' ', '')}.svg`}
                    alt=""
                />
                <div class="description">
                    <h2>{item.company}</h2>
					<p class="position">{item.position}</p>
					<div class="date-location">
                        {#if item.end_date}
                            <p class="dates">{item.start_date} - {item.end_date} · {item.length}</p>
                        {/if}
                        {#if !item.end_date}
                            <p class="dates">{item.start_date} - Now </p>
                        {/if}
                    </div>
					<!-- <p class="location">{item.location}</p> -->
					<p>{item.description}</p>
                </div> 
            </div>
        </div>
    {/each}
</div>