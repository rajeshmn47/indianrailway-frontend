import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "@/components/home/home";
import TrainDetail from "@/components/traindetail";

const inter = Inter({ subsets: ["latin"] });

export default function Train({ data }) {
  return (
    <>
      <TrainDetail data={data} />
    </>
  );
}
export async function getStaticProps(context) {
  const { id } = context.params;
  console.log(id, "myid");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/todos/traindetail/${id}`;

  const data = await fetch(url, {
    method: "GET",
  }).then((res) => res.json());
  return {
    props: {
      data: data,
    },
    revalidate: 60,
  };
}

export const getStaticPaths = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: "blocking", // indicates the type of fallback
});
