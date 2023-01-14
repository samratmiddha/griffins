import SearchBox from "../components/dashboard/SearchBox";
import TradeBar from "../components/stock/TradeBar";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <TradeBar />
      <SearchBox />
    </>
  );
}
