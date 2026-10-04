import map from "../content/map.json";
import site from "../content/site.json";

type Labels = Record<string, string>;
type Point = { lon: number; lat: number; labelDx?: number; labelDy?: number; anchor?: "start" | "middle" | "end" };

const VIEW_W = 1000;
const VIEW_H = 610;
const PAD_X = 88;
const PAD_Y = 52;

const minLon = map.bounds.minLon;
const maxLon = map.bounds.maxLon;
const minLat = map.bounds.minLat;
const maxLat = map.bounds.maxLat;

function project([lon, lat]: [number, number]) {
  const x = PAD_X + ((lon - minLon) / (maxLon - minLon)) * (VIEW_W - PAD_X * 2);
  const y = VIEW_H - PAD_Y - ((lat - minLat) / (maxLat - minLat)) * (VIEW_H - PAD_Y * 2);
  return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
}

function pathFromCoords(coords: [number, number][]) {
  return coords.map((coord, index) => {
      const p = project(coord);
      return `${index === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    }).join(" ") + " Z";
}

export function ServiceAreaMap({ labels, ariaLabel }: { labels: Labels; ariaLabel: string }) {
  const countryPath = pathFromCoords(map.countryCoords as [number, number][]);
  const servicePath = pathFromCoords(map.serviceCoords as [number, number][]);

  return (
    <div className="service-map-wrap" role="img" aria-label={ariaLabel}>
      <svg className="service-map" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
        <defs>
          <clipPath id="belgiumClip"><path d={countryPath} /></clipPath>
          <filter id="zoneBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>
        <path className="belgium-shadow" d={countryPath} />
        <path className="belgium-land" d={countryPath} />
        <g clipPath="url(#belgiumClip)">
          <path className="service-zone-glow" d={servicePath} filter="url(#zoneBlur)" />
          <path className="service-zone" d={servicePath} />
        </g>
        {site.map.cities.map((id) => {
          const point = map.points[id as keyof typeof map.points] as Point;
          const p = project([point.lon, point.lat]);
          return (
            <g className="map-city" key={id}>
              <circle className="map-city-ring" cx={p.x} cy={p.y} r="10" />
              <circle className="map-city-dot" cx={p.x} cy={p.y} r="4.8" />
              <text x={p.x + (point.labelDx ?? 0)} y={p.y + (point.labelDy ?? 0)} textAnchor={point.anchor ?? "start"}>{labels[id]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}