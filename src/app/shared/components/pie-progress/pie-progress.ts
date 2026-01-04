import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  Chart,
  ChartConfiguration,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

// Enregistrement Chart.js (v4)
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels);

@Component({
  selector: 'app-pie-progress',
  templateUrl: './pie-progress.html',
  styleUrls: ['./pie-progress.css'],
})
export class PieProgress implements AfterViewInit, OnChanges {

  @ViewChild('pieChart', { static: false })
  pieChartRef!: ElementRef<HTMLCanvasElement>;

  /** Pourcentage réel (peut dépasser 100 ou être <0) */
  @Input() percentage: number = 0;

  /** Couleur du doughnut */
  @Input() color: 'vert' | 'bleu' | 'rouge' | 'gris' | 'noir' | 'jaune' | 'orange' = 'bleu';

  /** Pourcentage affiché (clampé 0-100) */
  displayedPercentage: number = 0;

  private chart!: Chart<'doughnut'>;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['percentage'] || changes['color'])) {
      this.updateChart();
    }
  }

  private getColorCode(color: string) {
    switch (color) {
      case 'vert': return { border: '#28a745', background: 'rgba(40, 167, 69, 0.2)' };
      case 'bleu': return { border: '#007bff', background: 'rgba(0, 123, 255, 0.2)' };
      case 'rouge': return { border: '#dc3545', background: 'rgba(220, 53, 69, 0.2)' };
      case 'gris': return { border: '#6c757d', background: 'rgba(108, 117, 125, 0.2)' };
      case 'noir': return { border: '#000000', background: 'rgba(0, 0, 0, 0.2)' };
      case 'jaune': return { border: '#ffc107', background: 'rgba(255, 193, 7, 0.2)' };
      case 'orange': return { border: '#fd7e14', background: 'rgba(253, 126, 20, 0.2)' };
      default: return { border: '#007bff', background: 'rgba(0, 123, 255, 0.2)' };
    }
  }

  private createChart(): void {
    const colors = this.getColorCode(this.color);

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [0, 100],
          backgroundColor: [colors.border, colors.background],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '75%',
        animation: { duration: 1000, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          datalabels: { display: false }
        }
      }
    };

    this.chart = new Chart(this.pieChartRef.nativeElement, config);

    // lancer l'animation vers la vraie valeur
    setTimeout(() => this.updateChart(), 50);
  }

  private updateChart(): void {
    const colors = this.getColorCode(this.color);

    // clampé pour le doughnut (0–100)
    this.displayedPercentage = Math.max(0, Math.min(100, this.percentage));

    this.chart.data.datasets[0].data = [
      this.displayedPercentage,
      100 - this.displayedPercentage
    ];

    this.chart.data.datasets[0].backgroundColor = [
      colors.border,
      colors.background
    ];

    this.chart.update();
  }
}
