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
    <Styles.Wrapper>
      {!!label && (
        <Styles.Label labelColor={labelColor} htmlFor={name}>
          {label}
        </Styles.Label>
      )}
      <Styles.HorizontalOverflow>
        <Styles.InlineBlock>
          <Styles.OverflowHidden>
            <Styles.Table>
              <Styles.TableHead>
                <tr>
                  {titles.map((title) => (
                    <Styles.RowHead key={title} scope="col">
                      {title.toLocaleUpperCase()}
                    </Styles.RowHead>
                  ))}
                </tr>
              </Styles.TableHead>
              <tbody>
                {data.map((rows, rowIndex) => (
                  <Styles.Row key={rowIndex}>
                    {Object.values(rows).map((item, itemIndex) => (
                      <Styles.Data key={itemIndex}>{item}</Styles.Data>
                    ))}
                  </Styles.Row>
                ))}
              </tbody>
            </Styles.Table>
          </Styles.OverflowHidden>
        </Styles.InlineBlock>
      </Styles.HorizontalOverflow>
    </Styles.Wrapper>
  )
}

export default DataTable
