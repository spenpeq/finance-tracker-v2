import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "../lib/prisma";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div>
      <Head>
        <title>Finance Tracker</title>
        <meta name="description" content="Track finances with Plaid API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="pt-60 m-auto">
          <h1 className="text-7xl font-extrabold text-slate-50 py-4 tracking-wide">
            Finance Tracker
          </h1>
          <p className="text-xl font-semibold text-slate-300 pb-2">
            View all your financial data in one place.
          </p>
          <p className="text-sm font-semibold text-slate-300">
            Made possible via the Plaid API. <a href="https://plaid.com/" className="text-lime-500 underline" target="_blank" rel="noopener noreferrer">Learn More</a>
          </p>

          {loading && (
            <>
              <h1 className="p-4 text-slate-100">LOADING ...</h1>
            </>
          )}
          <div className="m-auto space-x-4">
            {!session && (
              <>
                <p className="p-4 text-slate-100">You are not signed in.</p>
                <a
                  href={`/api/auth/signin`}
                  className="btn btn-primary py-4 px-12"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Get Started
                </a>
              </>
            )}
            {session?.user && (
              <>
                <div className="p-4 text-slate-100 relative">
                  Signed in as <strong>{session.user.email}</strong>
                  <br />
                  <strong>{session.user.name}</strong>
                  <br />
                  <Image
                    src={session.user.image!}
                    alt="Profile image"
                    layout="fill"
                  />
                </div>
                <a
                  href={`/api/auth/signout`}
                  className="btn btn-primary py-4 px-12"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
            <Link href="/protected">
              <a className="btn btn-secondary py-4 px-12">Protected</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const users = await prisma.user.findMany();
//   return {
//     props: { users },
//   };
// };

export default Home;
