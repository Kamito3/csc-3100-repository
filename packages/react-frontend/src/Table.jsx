// src/Table.jsx
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th> {/* ID column for IE3 */}
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

// src/Table.jsx
function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.id}</td> {/* #5 - show the id for IE3 */}
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });
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
