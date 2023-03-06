import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import ExcelInput from '../admin/components/ExcelInput'
import { Toaster } from 'react-hot-toast'
import { ArrowRight, File, LightBulb } from 'akar-icons'
import Image from 'next/image'

const AdminComp = () => {
  return (
    <div className="flex">
      <Toaster position="top-center" />
      <div className="w-144">
        <h1 className=" text-5xl font-bold">Welcome, Admin!</h1>
        <p className="mt-2 w-2/3 font-normal">
          Ready to serve your guests with the cutting edge NFT presents?
        </p>
        <ExcelInput />
      </div>
      <div className="ml-12 max-w-md self-end">
        <div className="rounded-lg bg-yellow-200 px-4 py-8">
          <div className="mb-4 flex">
            <LightBulb size={24} />
            <h2 className="ml-4 text-2xl">Need some help?</h2>
          </div>
          <h3 className="font-normal">
            {
              "Before choosing a file, check how your excel sheet's column headings are spelled, the order and the format of your data."
            }
          </h3>
          <h3 className="mt-4 font-normal">
            {
              'We are case sensitive, so its important check your file before uploading to avoid errors, here is the correct column headings, order and format you should use-'
            }
          </h3>
          <a
            className="mt-4 flex items-center"
            href="https://docs.google.com/spreadsheets/d/1mlkRQnLSrIy1Kui26N3cNTGngvo4DIuoJg3NRtPDpcc/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="font-semi-bold mr-1 underline">
              {'Use this template'}
            </h3>
            <File size={24} />
          </a>
          <div className="relative h-48 w-full">
            <Image
              src="https://ik.imagekit.io/chainlabs/Simplr_Events/sample_OGUguDIqIq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676634642267"
              alt="excel_sample"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminComp
