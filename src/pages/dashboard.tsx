import { trpc } from "../utils/trpc";

export default function Dashboard() {
  const { data, error } = trpc.useQuery(["users.me"]);
  if (error) {
    return error;
  }
  return <div>{JSON.stringify(data)}</div>;
}
