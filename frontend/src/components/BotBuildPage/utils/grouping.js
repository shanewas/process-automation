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

  const mapProcess = (id) => {
    for (const [idx, p] of processes.entries()) {
      if (p.id === id) return { id, idx };
    }
  };
  const groupProcesses = (tProcesses) => {
    const processes = [];
    const processesIdx = [];

    tProcesses
      .map(mapProcess)
      .sort((a, b) => (a.idx < b.idx ? -1 : 1))
      .forEach(({ id, idx }) => {
        processes.push(id);
        processesIdx.push(idx);
      });

    return {
      processes,
      processesIdx,
    };
  };

  Object.keys(groups).forEach(
    (groupName) =>
      (tGroups[groupName] = {
        ...groups[groupName],
        ...groupProcesses(groups[groupName].processes),
      })
  );

  return tGroups;
};
