import Head from "next/head";

interface PageMetadataProps {
  title: string;
}

export function PageMetadata({ title }: PageMetadataProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Cool Todo app that you need to check out"
      />
    </Head>
  );
}
