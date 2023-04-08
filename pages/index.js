import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import path from 'path';
import { getSortedPostsData } from '../lib/posts';
import glob from 'glob'

export async function getStaticProps() {
const postsDirectory = path.join(process.cwd(), 'posts');
const mdFiles = await glob(path.join(postsDirectory, "**/*.md"))

  const allPostsData = getSortedPostsData(mdFiles);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, fileContents }) => (
            <li className={utilStyles.listItem} key={id}>
              {/* {title}
              <br />
              {id}
              <br />
              {date} */}
              <br/>
              {fileContents}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}