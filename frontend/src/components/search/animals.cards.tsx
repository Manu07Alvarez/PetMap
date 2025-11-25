import { component$ } from "@builder.io/qwik";

// Sample data - replace with actual data from API/props
const animals = [
	{
		id: 1,
		name: "Buddy",
		breed: "Golden Retriever",
		gender: "Male",
		location: "Central Park",
		date: "08/15/2023",
		image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=500&fit=crop"
	},
	{
		id: 2,
		name: "Luna",
		breed: "Husky",
		gender: "Female",
		location: "Downtown",
		date: "08/20/2023",
		image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=500&fit=crop"
	},
	{
		id: 3,
		name: "Max",
		breed: "German Shepherd",
		gender: "Male",
		location: "Riverside Park",
		date: "08/18/2023",
		image: "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=400&h=500&fit=crop"
	},
	{
		id: 4,
		name: "Bella",
		breed: "Labrador",
		gender: "Female",
		location: "Oak Street",
		date: "08/22/2023",
		image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop"
	},
	{
		id: 5,
		name: "Charlie",
		breed: "Beagle",
		gender: "Male",
		location: "Main Square",
		date: "08/19/2023",
		image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=500&fit=crop"
	},
	{
		id: 6,
		name: "Daisy",
		breed: "Poodle",
		gender: "Female",
		location: "Park Avenue",
		date: "08/21/2023",
		image: "https://images.unsplash.com/photo-1616080481100-f7c0f5f4e3e7?w=400&h=500&fit=crop"
	},
	{
		id: 7,
		name: "Rocky",
		breed: "Bulldog",
		gender: "Male",
		location: "West End",
		date: "08/17/2023",
		image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=500&fit=crop"
	},
	{
		id: 8,
		name: "Molly",
		breed: "Border Collie",
		gender: "Female",
		location: "Green Valley",
		date: "08/23/2023",
		image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=500&fit=crop"
	}
];

export default component$(() => {
	return (
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
			{animals.map((animal) => (
				<div
					key={animal.id}
					class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
				>
					<figure class="aspect-[3/4] overflow-hidden">
						<img
							src={animal.image}
							alt={animal.name}
							width={400}
							height={500}
							class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
						/>
					</figure>
					<div class="card-body p-4">
						<h3 class="card-title text-base-content text-lg font-bold">
							{animal.name}
						</h3>
						<div class="space-y-1">
							<p class="text-base-content/80 text-sm">
								<span class="font-semibold">Breed:</span> {animal.breed}
							</p>
							<p class="text-base-content/80 text-sm">
								<span class="font-semibold">Gender:</span> {animal.gender}
							</p>
							<p class="text-base-content/80 text-sm">
								<span class="font-semibold">Last Seen:</span> {animal.location}
							</p>
							<p class="text-base-content/80 text-sm">
								<span class="font-semibold">Date:</span> {animal.date}
							</p>
						</div>
						<div class="card-actions justify-end mt-2">
							<button class="btn btn-primary btn-sm">View Details</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
});