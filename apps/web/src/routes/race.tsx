// Race.tsx
import { useFetch } from '@/hooks/useFetch';
import { RaceDetails } from '@/types/race';
import RaceDetailsComponent from '../components/RaceDetailsComponent';
import RaceStatsChart from '../components/RaceStatsChart';
import SpeedDistanceBarChart from '../components/SpeedDistanceBarChart';
import SpeedBatteryScatterChart from '../components/SpeedBatteryScatterChart';
import SpeedDistributionChart from '../components/SpeedDistributionChart';
import BatteryOverTimeChart from '../components/BatteryOverTimeChart';
import DistanceOverTimeChart from '../components/DistanceOverTimeChart';
import PerformanceRadarChart from '../components/PerformanceRadarChart';
import { createFileRoute } from '@tanstack/react-router';
import { HttpMethod } from 'common/services';

// Création de la route
export const Route = createFileRoute('/race')({
  validateSearch: (race: Record<string, unknown>) => {
    return {
      id: (race?.id as string) || '',
    };
  },
  component: Race,
});

export default function Race() {
  const { id } = Route.useSearch();
  const state = useFetch<RaceDetails>(`race/${id}`, HttpMethod.GET);

  if (state.status === 'loading') return <div className="text-foreground">Loading...</div>;
  if (state.status === 'error') return <div className="text-destructive">{state.error}</div>;

  if (state.status === 'success') {
    const raceData = state.data?.race_data;
    const stats = state.data?.stats;
    const sensor = state.data?.sensor || { date: [], distance: [], speed: [], battery: [], track: [] };

    return (
      <div className="bg-background text-foreground p-6">
        <RaceDetailsComponent
          name={raceData?.name || 'Nom non disponible'}
          vehicleName={raceData?.vehicle_name || 'Véhicule non disponible'}
          date={raceData?.date || 'Date non disponible'}
        />

        <div className="bg-card text-card-foreground shadow rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-primary">Données des Capteurs</h3>
          <div>
            <h4 className="font-semibold">Distance:</h4>
            <p>{sensor.distance.length ? `${sensor.distance[sensor.distance.length - 1]} km` : 'Aucune donnée'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Vitesse:</h4>
            <p>{sensor.speed.length ? `${sensor.speed[sensor.speed.length - 1]} km/h` : 'Aucune donnée'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Batterie:</h4>
            <p>{sensor.battery.length ? `${sensor.battery[sensor.battery.length - 1]}%` : 'Aucune donnée'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Trajet:</h4>
            <p>{sensor.track.length ? `Trajet ${sensor.track[sensor.track.length - 1]}` : 'Aucun trajet'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Dates:</h4>
            <p>{sensor.date.length ? new Date(sensor.date[sensor.date.length - 1]).toLocaleString() : 'Aucune date'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <RaceStatsChart
              distance={stats?.Distance || 0}
              maxSpeed={stats?.SpeedMax || 0}
              averageSpeed={stats?.SpeedAverage || 0}
              batteryMax={stats?.BatteryMax || 0}
              batteryMin={stats?.BatteryMin || 0}
              time={stats?.Time || 0}
            />
          </div>

          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <SpeedDistanceBarChart
              dates={sensor.date}
              speeds={sensor.speed}
              distances={sensor.distance}
            />
          </div>

          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <SpeedBatteryScatterChart
              speeds={sensor.speed}
              battery={sensor.battery}
            />
          </div>

          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <SpeedDistributionChart
              speeds={sensor.speed}
            />
          </div>

          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <BatteryOverTimeChart
              dates={sensor.date}
              battery={sensor.battery}
            />
          </div>

          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <DistanceOverTimeChart
              dates={sensor.date}
              distances={sensor.distance}
            />
          </div>

          <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <PerformanceRadarChart
              maxSpeed={stats?.SpeedMax || 0}
              averageSpeed={stats?.SpeedAverage || 0}
              distance={stats?.Distance || 0}
              batteryUsage={stats?.BatteryMax ? (100 - stats.BatteryMin) : 0}
              time={stats?.Time || 0}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}