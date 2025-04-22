// src/Table.jsx
function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody({ characterData, removeCharacter }) {
    const rows = characterData.map((row) => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.id}</td> 
        <td>{row.job}</td>
        <td>
          <button onClick={() => removeCharacter(row.id)}>Delete</button> {/* Use ID for deletion */}
        </td>
      </tr>
    ));
    return <tbody>{rows}</tbody>;
  }
  
  function Table(props) {
      return (
        <table>
          <TableHeader />
          <TableBody 
            characterData={props.characterData}
            removeCharacter={props.removeCharacter} 
            />
        </table>
      );
  }
  export default Table;