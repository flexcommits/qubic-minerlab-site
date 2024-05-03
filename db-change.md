
minersum1

create view
  public.minersum as
select
  lower("substring" ("minerControl".alias::text, 1, 4)) as "Alias",
  sum("minerControl"."currentIts") as "Total it/s",
  sum("minerControl"."solutionsFound") as "Total Solutions"
from
  "minerControl"
group by
  (
    lower("substring" ("minerControl".alias::text, 1, 4))
  );