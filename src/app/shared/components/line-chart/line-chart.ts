import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  NgZone
} from '@angular/core';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Filler,
  Tooltip,
  ChartConfiguration,
  ChartDataset
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Filler,
  Tooltip,
  ChartDataLabels
);

interface ChartData {
  date: string;
  amount: number;
}

type ColorType = 'vert' | 'bleu' | 'rouge' | 'gris' | 'noir' | 'jaune' | 'orange';

interface ColorScheme {
  border: string;
  background: string;
  point: string;
  label: string;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.html',
  styleUrls: ['./line-chart.css'],
})
export class LineChart implements AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('chartCanvas', { static: false })
  private chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() data: ChartData[] = [];
  @Input() year!: number;
  @Input() nature: string = 'Valeur';
  @Input() color: ColorType = 'bleu';

  private chart!: Chart<'line', number[], string>;

  private readonly MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['year'] || changes['nature'] || changes['color'])) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    const colors = this.getColorScheme(this.color);

    const dataset: ChartDataset<'line', number[]> = {
      label: `${this.capitalizeFirstLetter(this.nature)} en ${this.year}`,
      data: Array(12).fill(0),
      borderColor: colors.border,
      backgroundColor: colors.background,
      borderWidth: 2,
      fill: true,
      tension: 0.3,
      pointBackgroundColor: colors.point,
      pointBorderColor: colors.border,
      pointRadius: 5,
      pointHoverRadius: 8
    };

    const config: ChartConfiguration<'line', number[], string> = {
      type: 'line',
      data: {
        labels: this.MONTHS,
        datasets: [dataset]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `${this.capitalizeFirstLetter(this.nature)} pour l'année ${this.year}`,
            font: { size: 16 }
          },
          legend: {
            display: true,
            position: 'top',
            labels: { font: { size: 12 } }
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (ctx) =>
                `${ctx.label} : ${(ctx.raw as number).toLocaleString('fr-FR')}`
            }
          },
          datalabels: {
            color: colors.label,
            anchor: 'end',
            align: 'top',
            font: { weight: 'bold', size: 12 },
            formatter: (value: number) =>
              value > 0 ? value.toLocaleString('fr-FR') : ''
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois',
              font: { weight: 'bold' }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Montant',
              font: { weight: 'bold' }
            }
          }
        }
      }
    };

    this.ngZone.runOutsideAngular(() => {
      this.chart = new Chart(this.chartCanvasRef.nativeElement, config);
      setTimeout(() => this.updateChart(), 50);
    });
  }

  private updateChart(): void {
    if (!this.chart) return;

    const colors = this.getColorScheme(this.color);
    const amounts = this.computeMonthlyAmounts();
    const dataset = this.chart.data.datasets[0] as ChartDataset<'line', number[]>;

    dataset.data = amounts;
    dataset.label = `${this.capitalizeFirstLetter(this.nature)} en ${this.year}`;
    dataset.borderColor = colors.border;
    dataset.backgroundColor = colors.background;
    dataset.pointBackgroundColor = colors.point;
    dataset.pointBorderColor = colors.border;

    if (this.chart.options.plugins?.title) {
      this.chart.options.plugins.title.text =
        `${this.capitalizeFirstLetter(this.nature)} pour l'année ${this.year}`;
    }

    if (this.chart.options.plugins?.datalabels) {
      this.chart.options.plugins.datalabels.color = colors.label;
    }

    this.chart.update();
  }

  private computeMonthlyAmounts(): number[] {
    const amounts = Array(12).fill(0);
    this.data.forEach(item => {
      const date = new Date(item.date);
      if (date.getFullYear() === this.year) {
        amounts[date.getMonth()] += item.amount;
      }
    });
    return amounts;
  }

  private getColorScheme(color: ColorType): ColorScheme {
    const schemes: Record<ColorType, ColorScheme> = {
      vert: { border: '#28a745', background: 'rgba(40,167,69,0.2)', point: '#28a745', label: '#16722b' },
      bleu: { border: '#007bff', background: 'rgba(0,123,255,0.2)', point: '#007bff', label: '#0a3665' },
      rouge:{ border: '#dc3545', background: 'rgba(220,53,69,0.2)', point: '#dc3545', label: '#6b121b' },
      gris: { border: '#6c757d', background: 'rgba(108,117,125,0.2)', point: '#6c757d', label: '#3d4246' },
      noir: { border: '#343a40', background: 'rgba(52,58,64,0.2)', point: '#343a40', label: '#212529' },
      jaune:{ border: '#ffc107', background: 'rgba(255,193,7,0.2)', point: '#ffc107', label: '#856609' },
      orange:{ border: '#fd7e14', background: 'rgba(253,126,20,0.2)', point: '#fd7e14', label: '#a0500e' }
    };
    return schemes[color] || schemes.bleu;
  }

  private capitalizeFirstLetter(text: string): string {
    return text
      ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      : '';
  }
}
