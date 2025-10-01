export type Post = {
	_id: string;
	title: string;
	slug: string;
	author: string;
	coverImage: string;
	contents: {
		id: string;
		type?: "image" | "video";
		url?: string;
		index: number;
	}[];
	instagramUrl: string;
	createdAt: Date;
	updatedAt: Date;
};

