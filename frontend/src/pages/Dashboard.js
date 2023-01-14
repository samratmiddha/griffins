import SearchBox from "../components/SearchBox";
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
