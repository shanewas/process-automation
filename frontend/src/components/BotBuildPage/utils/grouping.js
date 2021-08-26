export const mapProcessesOfGroups = (processes, groups) => {
  const tGroups = {};

  const mapProcess = (id) => {
    for (const [idx, p] of processes.entries()) {
      if (p.id === id) return { ...p, idx };
    }
  };

  Object.keys(groups).forEach(
    (groupName) =>
      (tGroups[groupName] = {
        ...groups[groupName],
        processes: groups[groupName].processes
          .map(mapProcess)
          .sort((a, b) => (a.idx < b.idx ? -1 : 1)),
      })
  );

  return tGroups;
};

export const mapProcessesAndIdx = (processes, groups) => {
  const tGroups = {};
  const groupedProcesses = {};

  const mapProcess = (id) => {
    for (const [idx, p] of processes.entries()) {
      if (p.id === id) return { id, idx };
    }
  };

  const groupProcesses = (tProcesses) => {
    const processes = [];
    const processesIdx = [];

    // tProcesses are (groups internal processes)
    tProcesses
      .map(mapProcess)
      .sort((a, b) => (a.idx < b.idx ? -1 : 1))
      .forEach(({ id, idx }) => {
        processes.push(id);
        processesIdx.push(idx);
        groupedProcesses[idx] = true;
      });

    return {
      processes,
      processesIdx,
    };
  };

  // First
  // looping over the groups to return the exact stuff but with processes and their index
  Object.keys(groups).forEach(
    (groupName) =>
      (tGroups[groupName] = {
        ...groups[groupName],
        ...groupProcesses(groups[groupName].processes),
      })
  );

  return { tGroups, groupedProcesses };
};
