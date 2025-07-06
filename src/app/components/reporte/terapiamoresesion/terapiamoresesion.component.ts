import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SesionTerapiaService } from '../../../services/sesion-terapia.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-terapiamoresesion',
  imports: [NgChartsModule, CommonModule, MatIconModule],
  templateUrl: './terapiamoresesion.component.html',
  styleUrl: './terapiamoresesion.component.css'
})
export class TerapiamoresesionComponent implements OnInit {
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 16
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            size: 16
          },
          stepSize: 1,
        },
        grid: {
          display: false
        }
      }
    }
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sst: SesionTerapiaService) {}

  ngOnInit(): void {
    this.sst.listTerapiamoresesion().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;

        this.barChartLabels = data.map(item => item.nameterapia);
        this.barChartData = [
          {
            data: data.map(item => item.quantitysesion),
            label: 'Usuarios Activos en Terapia',
            backgroundColor: '#ed94ed',
            barPercentage: 0.4,
          }
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
