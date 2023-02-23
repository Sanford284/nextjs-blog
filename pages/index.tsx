import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import variables from '../styles/variables.module.scss';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { GetServerSideProps } from 'next';

export default function Home({ allPostsData, name }) {
    return (
        <Layout home>
            {/* Keep the existing code here */}

            {/* Add this <section> tag below the existing <section> tag */}
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>{name}'s Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
                <div>
                    <Link href="/posts/a/b/c">跳转到posts/a/b/c</Link>
                </div>
            </section>
        </Layout>
    );
}

/**
 * Development vs. Production
In development (npm run dev or yarn dev), getStaticProps runs on every request.
In production, getStaticProps runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths

What If I Need to Fetch Data at Request Time?
Since Static Generation happens once at build time, it's not suitable for data that updates frequently or changes on every user request.

In cases like this, where your data is likely to change, you can use Server-side Rendering. Let's learn more about server-side rendering in the next section.
 */
// getStaticProps only gets called on the server
// getStaticProps can only be exported from a page
// export async function getStaticProps() {
//     const allPostsData = getSortedPostsData();
//     return {
//         props: {
//             allPostsData,
//         },
//     };
// }

export const getServerSideProps: GetServerSideProps<{ name: string; allPostsData: any }> = async (
    context
) => {
    return {
        props: {
            name: 'real',
            allPostsData: getSortedPostsData(),
        },
    };
};
