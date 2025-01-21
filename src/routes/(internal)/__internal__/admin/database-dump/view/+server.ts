import { leafClient } from '$lib/leaf';
import { getSession } from '$lib/rauthy/server';
import { error, type RequestHandler } from '@sveltejs/kit';
import { CommonMark, Description, Name, RawImage } from 'leaf-proto/components';
import { MastodonProfile, Tags, WebLinks, WeirdCustomDomain } from '$lib/leaf/profile';
import _ from 'underscore';
import { prettyPrintDump } from '$lib/utils/databaseDump';

export const GET: RequestHandler = async ({ fetch, request }) => {
	let { sessionInfo } = await getSession(fetch, request);
	if (!sessionInfo?.roles?.includes('admin')) {
		return error(403, 'Access denied');
	}

	let dump = await leafClient.create_database_dump();

	const print = prettyPrintDump(dump, [
		Name,
		CommonMark,
		WebLinks,
		Tags,
		WeirdCustomDomain,
		Description,
		MastodonProfile,
		RawImage
	]);

	return new Response(print);
};
