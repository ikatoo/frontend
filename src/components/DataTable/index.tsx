import Styles from './styles'

export type DataTableProps = {
  data: object[]
  label?: string
  labelColor?: 'black' | 'white'
  name: string
}

const DataTable = ({
  name,
  data,
  label,
  labelColor = 'black'
}: DataTableProps) => {
  if (!data.length) return <></>

  const titles: string[] = Object.keys(data[0])

  return (
    <div className="flex flex-col">
      {!!label && (
        <Styles.Label labelColor={labelColor} htmlFor={name}>
          {label}
        </Styles.Label>
      )}
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  {titles.map((title) => (
                    <th key={title} scope="col" className=" px-6 py-4">
                      {title.toLocaleUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((rows, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b dark:border-neutral-500"
                  >
                    {Object.values(rows).map((item, itemIndex) => (
                      <td
                        key={itemIndex}
                        className="whitespace-nowrap  px-6 py-4 font-medium"
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable
