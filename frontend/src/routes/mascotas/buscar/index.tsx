import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div
            class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
            style='--select-button-svg: url(&apos;data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(103,106,131)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e&apos;); font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;'
        >
            <div class="layout-container flex h-full grow flex-col">

            <div class="gap-1 px-6 flex flex-1 justify-center py-5">
                <div class="layout-content-container flex flex-col max-w-[920px] flex-1">
                <div class="flex flex-wrap justify-between gap-3 p-4">
                    <p class="text-[#121217] tracking-light text-[32px] font-bold leading-tight min-w-72">Search for Lost Pets</p>
                </div>
                <h2 class="text-[#121217] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Search Results</h2>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                    <div class="flex flex-col gap-3 pb-3">
                    <div
                        class="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuArx7RUwXyeEASJGdZCmqKyitRFvrlexDJPdLqKaHlnhiahStbSXiwzLXwmeczZHyeh45oEfFq3Eb_8iqUMyIzps1SHmSRTO9RLZL9qysDyHbATQtO-ZSbN3rieMRlr6_AeUe_u1HHuIVUd3m1lvDBggRjGTFnO8bWt5mcrg_xNFTCBafkHtEy_dQmp7_larY9hq8s9woFIRgycXKHqtqwgIKd5PsxMojDi8yUvfczBRCPn6npgJM8qcmMdRw990GITfwysxaJ6Qw");'
                    ></div>
                    <div>
                        <p class="text-[#121217] text-base font-medium leading-normal">Buddy</p>
                        <p class="text-[#676a83] text-sm font-normal leading-normal">Golden Retriever, Male, Lost near Central Park on 08/15/2023</p>
                    </div>
                    </div>
                </div>
                </div>
                <div class="layout-content-container flex flex-col w-[360px]">
                <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label class="flex flex-col min-w-40 flex-1">
                    <p class="text-[#121217] text-base font-medium leading-normal pb-2">Animal Type</p>
                    <select
                        class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dddde4] bg-white focus:border-[#dddde4] h-14 bg-[image:--select-button-svg] placeholder:text-[#676a83] p-[15px] text-base font-normal leading-normal"
                    >
                        <option value="one"></option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                    </select>
                    </label>
                </div>
                <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label class="flex flex-col min-w-40 flex-1">
                    <p class="text-[#121217] text-base font-medium leading-normal pb-2">Breed</p>
                    <select
                        class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dddde4] bg-white focus:border-[#dddde4] h-14 bg-[image:--select-button-svg] placeholder:text-[#676a83] p-[15px] text-base font-normal leading-normal"
                    >
                        <option value="one"></option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                    </select>
                    </label>
                </div>
                <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label class="flex flex-col min-w-40 flex-1">
                    <p class="text-[#121217] text-base font-medium leading-normal pb-2">Last Seen Location</p>
                    <input
                        class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dddde4] bg-white focus:border-[#dddde4] h-14 placeholder:text-[#676a83] p-[15px] text-base font-normal leading-normal"
                        value=""
                    />
                    </label>
                </div>
                <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label class="flex flex-col min-w-40 flex-1">
                    <p class="text-[#121217] text-base font-medium leading-normal pb-2">Date Lost</p>
                    <input
                        class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dddde4] bg-white focus:border-[#dddde4] h-14 placeholder:text-[#676a83] p-[15px] text-base font-normal leading-normal"
                        value=""
                    />
                    </label>
                </div>
                <div class="flex px-4 py-3 justify-end">
                    <button
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#969ce3] text-[#121217] text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                    <span class="truncate">Search</span>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
});