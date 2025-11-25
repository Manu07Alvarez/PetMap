import { component$, useSignal, $ } from "@builder.io/qwik";
import AnimalsCards from "~/components/search/animals.cards";

export default component$(() => {
    const selectedTags = useSignal<string[]>([]);
    const availableTags = ["Lost", "Found", "Injured", "Friendly", "Aggressive", "Microchipped", "Collar", "No Collar"];

    const toggleTag = $((tag: string) => {
        if (selectedTags.value.includes(tag)) {
            selectedTags.value = selectedTags.value.filter(t => t !== tag);
        } else {
            selectedTags.value = [...selectedTags.value, tag];
        }
    });

    // Reusable filter content component
    const FilterContent = () => (
        <>
            {/* Name Search */}
            <div class="mb-5">
                <label class="flex flex-col">
                    <p class="text-base-content text-sm font-semibold mb-2">
                        Pet Name
                    </p>
                    <input
                        type="text"
                        placeholder="e.g., Buddy, Max..."
                        class="input input-bordered w-full rounded-xl text-base-content bg-base-100 h-12 text-sm"
                    />
                </label>
            </div>

            {/* Animal Type */}
            <div class="mb-5">
                <label class="flex flex-col">
                    <p class="text-base-content text-sm font-semibold mb-2">
                        Animal Type
                    </p>
                    <select class="select select-bordered w-full rounded-xl text-base-content bg-base-100 h-12 text-sm">
                        <option value="">All Types</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="other">Other</option>
                    </select>
                </label>
            </div>

            {/* Location Search */}
            <div class="mb-5">
                <label class="flex flex-col">
                    <p class="text-base-content text-sm font-semibold mb-2">
                        Location
                    </p>
                    <input
                        type="text"
                        placeholder="City, neighborhood, or address"
                        class="input input-bordered w-full rounded-xl text-base-content bg-base-100 h-12 text-sm"
                    />
                </label>
            </div>

            {/* Date Range */}
            <div class="mb-5">
                <p class="text-base-content text-sm font-semibold mb-2">
                    Date Range
                </p>
                <div class="flex flex-col gap-3">
                    <label class="flex flex-col">
                        <span class="text-base-content/70 text-xs mb-1">From</span>
                        <input
                            type="date"
                            class="input input-bordered w-full rounded-xl text-base-content bg-base-100 h-12 text-sm"
                        />
                    </label>
                    <label class="flex flex-col">
                        <span class="text-base-content/70 text-xs mb-1">To</span>
                        <input
                            type="date"
                            class="input input-bordered w-full rounded-xl text-base-content bg-base-100 h-12 text-sm"
                        />
                    </label>
                </div>
            </div>

            {/* Tags Multi-Select */}
            <div class="mb-6">
                <p class="text-base-content text-sm font-semibold mb-3">
                    Tags
                </p>
                <div class="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                        <button
                            key={tag}
                            onClick$={() => toggleTag(tag)}
                            class={`badge badge-lg cursor-pointer transition-all duration-200 ${
                                selectedTags.value.includes(tag)
                                    ? "badge-primary"
                                    : "badge-outline hover:badge-primary hover:badge-outline"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                {selectedTags.value.length > 0 && (
                    <div class="mt-3 pt-3 border-t border-base-300">
                        <p class="text-xs text-base-content/60 mb-2">
                            Selected: {selectedTags.value.length}
                        </p>
                        <button
                            onClick$={() => (selectedTags.value = [])}
                            class="text-xs text-error hover:underline"
                        >
                            Clear all tags
                        </button>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div class="flex gap-3">
                <button class="btn btn-outline flex-1 rounded-xl h-12 text-sm">
                    Clear All
                </button>
                <button class="btn btn-primary flex-1 rounded-xl h-12 text-sm font-bold">
                    Apply Filters
                </button>
            </div>
        </>
    );

    return (
        <div
            class="relative flex size-full min-h-screen flex-col bg-base-100 group/design-root overflow-x-hidden"
            style='font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;'
        >
            <div class="layout-container flex h-full grow flex-col">
                <div class="gap-6 px-6 flex flex-1 justify-center py-5">
                    {/* Results Section */}
                    <div class="layout-content-container flex flex-col w-full lg:max-w-[920px] flex-1">
                        <div class="flex flex-wrap justify-between items-center gap-3 p-4">
                            <p class="text-base-content tracking-light text-[32px] font-bold leading-tight">
                                Search for Lost Pets
                            </p>
                            
                            {/* Mobile Filter Dropdown - Only visible on small screens */}
                            <div class="lg:hidden dropdown dropdown-end">
                                <label tabIndex={0} class="btn btn-primary gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                    </svg>
                                    Filters
                                    {selectedTags.value.length > 0 && (
                                        <span class="badge badge-sm badge-secondary">{selectedTags.value.length}</span>
                                    )}
                                </label>
                                <div tabIndex={0} class="dropdown-content z-[1] mt-3 w-96 max-w-[calc(100vw-2rem)]">
                                    <div class="bg-base-200 rounded-2xl p-6 shadow-xl max-h-[80vh] overflow-y-auto">
                                        <h3 class="text-base-content text-xl font-bold mb-6">Filters</h3>
                                        <FilterContent />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h2 class="text-base-content text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                            Search Results
                        </h2>
                        <AnimalsCards />
                    </div>

                    {/* Desktop Filters Sidebar - Only visible on large screens */}
                    <div class="hidden lg:flex layout-content-container flex-col w-[380px]">
                        <div class="bg-base-200 rounded-2xl p-6 sticky top-5 shadow-lg">
                            <h3 class="text-base-content text-xl font-bold mb-6">Filters</h3>
                            <FilterContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});