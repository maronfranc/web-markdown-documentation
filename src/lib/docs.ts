import type { CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

export type DocGroup = {
	/** Directory path relative to the docs root; empty for top-level pages. */
	dir: string;
	label: string;
	docs: DocEntry[];
};

function humanize(raw: string): string {
	return raw
		.split(' ')
		.map((word) => (/^[A-Z0-9]+$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
		.join(' ');
}

function titleize(id: string): string {
	const segment = id.split('/').pop() ?? id;
	const raw = segment.replace(/\.(md|markdown)$/i, '').replace(/[-_]+/g, ' ').trim();
	if (!raw) return 'Untitled';
	return humanize(raw);
}

export function docDir(entry: DocEntry): string {
	return entry.id.split('/').slice(0, -1).join('/');
}

export function docGroupLabel(dir: string): string {
	if (!dir) return 'Overview';
	return humanize(dir.replace(/[-_]+/g, ' ').trim());
}

/** Groups entries by their directory, keeping the incoming order within and across groups. */
export function groupDocs(entries: DocEntry[]): DocGroup[] {
	const groups = new Map<string, DocEntry[]>();
	for (const entry of entries) {
		const dir = docDir(entry);
		const docs = groups.get(dir);
		if (docs) docs.push(entry);
		else groups.set(dir, [entry]);
	}
	return [...groups].map(([dir, docs]) => ({ dir, label: docGroupLabel(dir), docs }));
}

function firstHeading(entry: DocEntry): string | undefined {
	return entry.body?.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

export function docTitle(entry: DocEntry): string {
	return entry.data.title ?? firstHeading(entry) ?? titleize(entry.id);
}

export function docDescription(entry: DocEntry): string | undefined {
	return entry.data.description;
}
