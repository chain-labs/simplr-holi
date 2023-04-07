import If from '@/components/If'
import {
  addBatchId,
  addExcelData,
  addKey,
  batchSelector,
  CsvState,
  removeBatch,
} from '@/redux/batch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { read, utils } from 'xlsx'
import { checkIfColumnPresent, GET_CURRENT_BATCH_ID } from '../utils'
import ConfirmButton from './ConfirmButton'
import TableData from './TableData'

const HomeComponent = () => {
  const [parsedData, setParsedData] = useState<CsvState[]>([])
  const [file, setFile] = useState()
  const dispatch = useAppDispatch()
  const ref = useRef()
  const batch = useAppSelector(batchSelector)

  useEffect(() => {
    dispatch(addExcelData(parsedData))
  }, [parsedData, ref])

  useEffect(() => {
    let num
    GET_CURRENT_BATCH_ID().then((data) => {
      if (data.batches.length < 1) {
        num = 1
      } else {
        num = parseInt(data.batches?.[0]?.batchId) + 1 || 1
      }

      dispatch(addBatchId(num))
    })
  }, [])

  useEffect(() => {
    if (file) {
      readFile()
    }
  }, [file])

  const readFile = () => {
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const wb = read(event.target.result)
        const sheets = wb.SheetNames
        console.log(sheets[0], event.target.result)

        if (sheets.length) {
          const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]])
          console.log({ rows })
          const columnNotPresentArray = checkIfColumnPresent(rows)
          if (columnNotPresentArray.length === 0) {
            const data: CsvState[] = []
            try {
              rows.forEach((row) => {
                const firstDate = row.firstAllowedEntryDate?.split('-')
                const lastDate = row.lastAllowedEntryDate?.split('-')
                const firstDateStamp = new Date('July 1, 1999, 12:00:00')
                const lastDateStamp = new Date('July 1, 1999, 12:00:00')

                firstDateStamp.setDate(firstDate[0])
                firstDateStamp.setMonth(parseInt(firstDate[1]) - 1)
                firstDateStamp.setFullYear(firstDate[2])
                const firstDateTimestamp = firstDateStamp.getTime()
                lastDateStamp.setDate(lastDate[0])
                lastDateStamp.setMonth(parseInt(lastDate[1]) - 1)
                lastDateStamp.setFullYear(lastDate[2])
                const lastDateTimestamp = lastDateStamp.getTime()

                data.push({
                  firstName: row.firstName,
                  lastName: row.lastName,
                  email: row.email,
                  firstAllowedEntryDate: firstDateTimestamp.toString(),
                  lastAllowedEntryDate: lastDateTimestamp.toString(),
                })
              })
            } catch (err) {
              toast.error(
                'File could not be read properly! Please refer to the help section',
              )
              handleRemoveFile()
            }
            console.log({ rows, data })
            setParsedData(data)
          } else {
            const columnString = columnNotPresentArray.join(', ')
            toast.error(`${columnString} not present`)
            handleRemoveFile()
          }
        }
      }
      reader.readAsArrayBuffer(file)
    } catch (err) {
      toast.error(
        'File could not be read properly! Please refer to the help section',
      )
      handleRemoveFile()
    }
  }
  const handleRemoveFile = () => {
    setFile(null)
    dispatch(addKey())
    dispatch(removeBatch())
  }

  const handleImport = async ($event) => {
    setFile($event.target.files.length ? $event.target.files[0] : '')
  }

  return (
    <div className="mt-8 w-full rounded-2xl bg-gray-100 px-10 py-8 shadow-xl">
      <h1 className="w-128 text-4xl font-bold">Add your Invite list</h1>
      <div className="my-4 flex-1 py-4">
        <div className="input-group">
          <div className="custom-file flex">
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-violet-200 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-800 hover:file:bg-violet-600 hover:file:text-white"
              name="file"
              id="inputGroupFile"
              key={batch.key}
              required
              onChange={handleImport}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <If
              condition={!!file}
              then={
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveFile()}
                >
                  Clear
                </button>
              }
            />
          </div>
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto bg-white shadow-md sm:rounded-lg">
          <TableData />
          <div className="m-3 flex justify-end p-1">
            <ConfirmButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
