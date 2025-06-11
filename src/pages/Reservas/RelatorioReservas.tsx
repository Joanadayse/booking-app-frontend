import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { DefaultLayout } from "../../styles/DefaultLayout";
import type { Booking } from "../../models/booking";
import { getBookings } from "../../services/api";

const RelatorioReservas = () => {
  const [reservas, setReservas] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await getBookings();
        setReservas(data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  // Função que filtra reservas da semana atual
  const reservasDaSemana = () => {
    const hoje = new Date();
    const primeiroDia = new Date(hoje.setDate(hoje.getDate() - hoje.getDay() + 1)); // segunda
    const ultimoDia = new Date(hoje.setDate(hoje.getDate() - hoje.getDay() + 5));   // sexta

    return reservas.filter(r => {
      const dataReserva = new Date(r.date);
      return dataReserva >= primeiroDia && dataReserva <= ultimoDia;
    });
  };

  // Função para gerar o PDF
  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório de Reservas da Semana", 14, 22);

    const headers = ["Sala", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

    // Montar as linhas com salas e reservas por dia
    // Para simplificar, vamos criar uma tabela onde cada linha é uma sala
    // e nas colunas as reservas da semana por dia (apenas títulos)

    // Pega todas as salas únicas das reservas da semana
    const salas = Array.from(
      new Set(reservasDaSemana().map(r => r.Space?.name || "Sem sala"))
    );

    // Cria matriz com dados para cada sala e dia
    const data = salas.map(sala => {
      const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
      const diaDatas = dias.map((_, i) => {
        // pega a data correspondente ao dia da semana
        const hoje = new Date();
        const segunda = new Date(hoje.setDate(hoje.getDate() - hoje.getDay() + 1)); // segunda
        return new Date(segunda.getTime() + i * 24 * 60 * 60 * 1000);
      });

      // Para cada dia pega os títulos das reservas da sala naquele dia, separados por vírgula
      const reservasPorDia = diaDatas.map(dataDia => {
        const reservasDoDia = reservasDaSemana().filter(
          r =>
            r.Space?.name === sala &&
            new Date(r.date).toDateString() === dataDia.toDateString()
        );
        return reservasDoDia.map(r => r.title).join(", ") || "-";
      });

      return [sala, ...reservasPorDia];
    });

    autoTable(doc, {
      startY: 30,
      head: [headers],
      body: data,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save("relatorio-reservas.pdf");
  };

  return (
    <DefaultLayout>
      <h1>Relatório de Reservas da Semana</h1>

      {loading ? (
        <p>Carregando reservas...</p>
      ) : (
        <>
          <button onClick={gerarPDF} style={{ marginBottom: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}>
            Exportar PDF
          </button>

          <table border={1} cellPadding={5} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Sala</th>
                <th>Segunda</th>
                <th>Terça</th>
                <th>Quarta</th>
                <th>Quinta</th>
                <th>Sexta</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const salas = Array.from(new Set(reservasDaSemana().map(r => r.Space?.name || "Sem sala")));
                const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
                return salas.map((sala, idx) => {
                  const hoje = new Date();
                  const segunda = new Date(hoje.setDate(hoje.getDate() - hoje.getDay() + 1));
                  const diaDatas = dias.map((_, i) => new Date(segunda.getTime() + i * 24 * 60 * 60 * 1000));
                  const reservasPorDia = diaDatas.map(dataDia => {
                    const reservasDoDia = reservasDaSemana().filter(
                      r =>
                        r.Space?.name === sala &&
                        new Date(r.date).toDateString() === dataDia.toDateString()
                    );
                    return reservasDoDia.map(r => r.title).join(", ") || "-";
                  });

                  return (
                    <tr key={idx}>
                      <td>{sala}</td>
                      {reservasPorDia.map((titulo, i) => (
                        <td key={i}>{titulo}</td>
                      ))}
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </>
      )}
    </DefaultLayout>
  );
};

export default RelatorioReservas;
