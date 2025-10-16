import { component$ } from "@builder.io/qwik";
export default component$(() => {
	return(
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
	);
});