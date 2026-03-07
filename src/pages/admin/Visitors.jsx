export default function Visitors() {
  const visitors = [
    { id: 1, name: "Arjun", room: "Cottage 3" },
    { id: 2, name: "Meera", room: "Room 102" },
  ];

  return (
    <div className="admin-page">
      <h2>Visitors</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map(v => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
