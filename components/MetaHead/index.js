import Head from 'next/head';

export const MetaHead = ({title, description}) => {
	return (
		<Head>
			<meta name="description" content={description} />
			<title>{title}</title>
		</Head>
	)
};