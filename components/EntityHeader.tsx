import Image from "next/image";
import { Color, Entity, ILink } from "types";
import Link from "./Link";

const EntityToColor = new Map<Entity, Color>([
  ["block", "purple"],
  ["transaction", "danger"],
  ["address", "sun"],
  ["ether", "sun"],
]);

interface EntityHeaderProps {
  entity: Entity;
  title?: string;
  link?: ILink;
}

export default function EntityHeader({
  entity,
  title,
  link,
}: EntityHeaderProps) {
  return (
    <header
      className={`flex p-3 items-center justify-between border-b-2 border-dark-100 ${getHeaderBackgroundColor(
        entity
      )}`}
    >
      <div className="flex items-center gap-3">
        <Image
          width={20}
          height={20}
          alt={entity}
          src={`/icons/${entity}.svg`}
        />
        <h2 className="font-semibold first-letter:uppercase truncate">
          {title ?? entity}
        </h2>
      </div>
      {link && <Link href={link.href}>{link.text}</Link>}
    </header>
  );
}

function getHeaderBackgroundColor(entity: Entity) {
  const color = EntityToColor.get(entity);
  // Switch case is used here to deal with TailwindCSS that doesn't support dynamic class names
  switch (color) {
    case "sun":
      return `bg-sun-200`;
    case "purple":
      return `bg-purple-200`;
    case "danger":
      return `bg-danger-200`;
    default:
      return `bg-sun-200`;
  }
}
