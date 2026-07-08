import { FeatureItem } from "./FeatureItem"
import { featureList } from "./featureList"

export const AuthHero = () => {
  return (
    <div className="select-none">
      <div>
        <p className="font-semibold text-5xl/tight">Organize seus</p>
        <p className="font-semibold text-5xl/tight">gastos. Simplifique</p>
        <p className="font-semibold text-5xl/tight text-blue-400">sua vida.</p>
      </div>

      <div className="mt-7 max-w-1/2">
        <p className="text-white/50">WeSplit é a maneira mais fácil de dividir despesas, acompanhar pagamentos e manter tudo em ordem com seu grupo.</p>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {featureList.map(feature => (
          <FeatureItem key={feature.title} item={feature} />
        ))}
      </div>
    </div>
  )
}