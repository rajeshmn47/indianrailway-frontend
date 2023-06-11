import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "@/components/home/home";

const inter = Inter({ subsets: ["latin"] });

export default function Hom() {
  return (
    <>
      <Home />
    </>
  );
}
