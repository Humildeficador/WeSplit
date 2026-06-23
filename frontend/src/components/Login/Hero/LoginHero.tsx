import { FeatureItem } from "./FeatureItem"
import { featureList } from "./FeatureList"

export const LoginHero = () => {
  const textClass = `font-semibold text-5xl/tight`

  return (
    <div className="mt-10 select-none">
      <div>
        <p className={textClass}>Organize seus</p>
        <p className={textClass}>gastos. Simplifique</p>
        <p className={`${textClass} text-blue-4 00 `}>sua vida.</p>
      </div>

      <div className="mt-7 max-w-1/2">
        <p className="text-white/50">WeSplit é a maneira mais fácil de dividir despesas, acompanhar pagamentos e manter tudo em ordem com seu grupo.</p>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {featureList.map(feature => (
          <FeatureItem
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  )
}