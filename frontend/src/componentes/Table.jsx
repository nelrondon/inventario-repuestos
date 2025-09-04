import { formatDateTime } from "../libs.js";
import "./Table.css";

function Row({ headers, data, options = {}, children }) {
  const { strong, dates } = options;
  return (
    <tr>
      {Object.keys(headers).map((key, index) => {
        if (strong && strong.includes(key)) {
          return <th key={index}>{data[key]}</th>;
        } else if (dates && dates.includes(key)) {
          return <td key={index}>{formatDateTime(data[key])}</td>;
        }
        return <td key={index}>{data[key]}</td>;
      })}
      {children && <td>{children}</td>}
    </tr>
  );
}

export function Table({ headers, body, options, children }) {
  if (!headers || !body) return null;
  return (
    <table className="app-table">
      <thead>
        <tr>
          {Object.values(headers).map((value, index) => (
            <th key={index}>{value}</th>
          ))}
          {children && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {body.map((row, index) => (
          <Row key={index} headers={headers} data={row} options={options}>
            {children}
          </Row>
        ))}
      </tbody>
    </table>
  );
}
