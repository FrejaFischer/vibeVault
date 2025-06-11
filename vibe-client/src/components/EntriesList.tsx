
import { useEntries } from "../hooks/useEntries"
import EntriesListItem from "./EntriesListItem"

interface Props {
  className?: string
}

const EntriesList = ({className}: Props) => {

const {entries, error, isLoading} = useEntries()

if (error) {return <p>Error getting errors</p>}
console.log(entries)
  return (
      <article className={className}>
    {isLoading ? 
    <p className="m-auto">Loading...</p>
    : entries.length < 1 ? <p className="m-auto">No entries</p> :
    <ul>
        {entries.map((entry)=>(
            <EntriesListItem entry={entry}/>
        ))}
    </ul>
        }

    </article>
  )
}

export default EntriesList