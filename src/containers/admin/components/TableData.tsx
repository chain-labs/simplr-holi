import { batchSelector } from '@/redux/batch'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

const TableData = () => {
  const batch = useAppSelector(batchSelector)

  return (
    <div>
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-300 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {batch?.inputParams.length
            ? batch.inputParams.map((data, index) => (
                <tr className="border-b bg-white" key={index}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                  >
                    {data.firstName}
                  </th>
                  <td className="px-6 py-4"> {data.lastName}</td>
                  <td className="px-6 py-4"> {data.email}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </div>
  )
}

export default TableData
