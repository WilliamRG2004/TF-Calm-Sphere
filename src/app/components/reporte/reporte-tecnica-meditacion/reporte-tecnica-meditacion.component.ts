import { Component, OnInit } from '@angular/core';
import { TecnicaMeditacion } from '../../../models/tecnicaMeditacion';
import { TecnicaMeditacionService } from '../../../services/tecnica-meditacion.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js'
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts'


@Component({
  selector: 'app-reporte-tecnica-meditacion',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './reporte-tecnica-meditacion.component.html',
  styleUrl: './reporte-tecnica-meditacion.component.css'
})
export class ReporteTecnicaMeditacionComponent implements OnInit{
  chartData!: ChartData<'bar'>
  chartType: ChartType = 'bar'
  chartOptions: ChartOptions = {
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
          }
        },
        grid: {
          display: false
        }
      }
    }
  }

  tecnicas: TecnicaMeditacion[] = []

  constructor(private tecnicaService: TecnicaMeditacionService) {}

  ngOnInit(): void {
    this.tecnicaService.list().subscribe(data => {
      this.tecnicas = data
      this.generarGrafico()
    })
  }

  generarGrafico(): void {
    const conteo: { [tipo: string]: number } = {}

    for (const tecnica of this.tecnicas) {
      const tipo = tecnica.terapia.tipoTerapia
      conteo[tipo] = (conteo[tipo] || 0) + 1
    }

    const etiquetas = Object.keys(conteo)
    const valores = Object.values(conteo)

    this.chartData = {
      labels: etiquetas,
      datasets: [
        {
          data: valores,
          label: 'Terapias por Técnica de Meditación',
          backgroundColor: '#ed94ed'
        }
      ]
    }
  }
}
