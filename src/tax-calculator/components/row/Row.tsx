import './styles/row.scss'

export interface RowProps {
  label: string
  value: number | string
}

const Row = (props: RowProps) => {
  const {label, value} = props

  return (
    <div className="row">
      <div className="taxes">
        <span className="label">{label}:</span>
        <span>
            {value}
          </span>
      </div>
    </div>
  )
}

export default Row
