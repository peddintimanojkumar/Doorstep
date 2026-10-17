import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfessionalJobs,
  acceptJob as acceptJobApi,
  declineJob as declineJobApi,
  completeJob as completeJobApi,
} from "../services/api/professionalsApi";

export function useProfessionalJobs() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["professionalJobs"],
    queryFn: getProfessionalJobs,
    staleTime: 0,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["professionalJobs"],
    });

  const acceptJob = async (id) => {
    const result = await acceptJobApi(id);
    await invalidate();
    return result;
  };

  const declineJob = async (id) => {
    const result = await declineJobApi(id);
    await invalidate();
    return result;
  };

  const completeJob = async (id) => {
    const result = await completeJobApi(id);
    await invalidate();
    return result;
  };

  return {
    ...query,
    jobs: query.data ?? [],
    acceptJob,
    declineJob,
    completeJob,
  };
}
