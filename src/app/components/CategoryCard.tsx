type Props = {
  title: string;
  icon: string;
};

export default function CategoryCard({ title, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2
                    rounded-lg bg-white p-3 shadow-sm
                    active:scale-95 transition">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-gray-700 text-center">
        {title}
      </span>
    </div>
  );
}