export const mockData = [
  { entry_pk: 1, entry_title: "My Playlist 1", entry_period: "Summer 2023", entry_link: "link.com", entry_image: "image", entry_description: "this is my description" },
  { entry_pk: 2, entry_title: "My Playlist 2", entry_period: "Summer 2022", entry_link: "link.com", entry_image: "image", entry_description: "this is my description" },
  { entry_pk: 3, entry_title: "My Playlist 3", entry_period: "Summer 2024", entry_link: "link.com", entry_image: "image", entry_description: "this is my description" },
];

export type Data = (typeof mockData)[number];
