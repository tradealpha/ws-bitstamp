/*#####
  #
  # SMA: Simple Moving Average
  # @param N: number of days
  #*/
export const SMA = (n: number): { a: number[]; b: number[] } => {
  const a: number[] = [1.0];
  const b: number[] = new Array(n).fill(1).map((x) => x / n);

  return { a, b };
};

/*
  #####
  #
  # EWMA: Exponentially Weighted Moving Average
  # @param lambda: energy/half-life parameter (see p.20-25, not sure)
  #*/
export const EWMA = (lambda: number) => {
  const b: number[] = [1.0 * (1 - lambda)];
  const a: number[] = [1, -lambda];

  return { a, b };
};

/*#####
  #
  # EWMA: Exponentially Weighted Moving Average
  # @param N: number of days (p.25)
  #  */
export const EWMAday = (n: number): { a: number[]; b: number[] } => {
  const lambda = (n - 1) / (n + 1);
  return EWMA(lambda);
};

/*"""
    a_0y[n] + a_1y[n-1] + ... a_Ny[n-N] = b_0x[n] + b_1x[n-1] + ... + b_Mx[n-M]
    see p.12 master thesis

    usage: filter(a._2, a._1, p)
  """*/
export const filter = (
  { b, a }: { b: number[]; a: number[] },
  x: number[]
): number[] => {
  //get lengths of vector, to avoid wasting time calculating them every new iteration
  const N = a.length;
  const M = b.length;
  const Mx = x.length;

  const y = new Array(Mx).fill(0);

  let k: number = 0;
  for (k = 0; k < Mx; k++) {
    y[k] = 0;

    // moving average part (MA)
    let i = 0;
    for (i = 0; i < M; i++) {
      if (k - i + 1 > 0 && k - i + 1 <= Mx) {
        y[k] = b[i] * x[k - i] + y[k];
      }
    }

    // auto regressive part (AR)
    for (i = 1; i < N; i++) {
      if (k - i + 1 > 0) {
        y[k] = -a[i] * y[k - i] + y[k];
      }
    }
  }
  return y;
};
