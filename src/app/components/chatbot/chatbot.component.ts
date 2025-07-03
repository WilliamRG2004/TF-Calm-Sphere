import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit{
  mensajeUsuario = '';
  mensajes: { autor: string; texto: string }[] = [];
  cargando = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.mensajes.push({
        autor: 'Bot',
        texto:
          'Hola, soy Calm Help IA. Estoy aquí para acompañarte y responder tus consultas sobre el estrés, la concentración o técnicas de relajación. ¿En qué puedo ayudarte hoy?',
      });
    }, 1000);
  }

  enviar() {
    if (!this.mensajeUsuario.trim()) return;

    const mensaje = this.mensajeUsuario.trim();
    this.mensajes.push({ autor: 'Usuario', texto: mensaje });
    this.mensajeUsuario = '';
    this.cargando = true;

    fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
        //Authorization: `Bearer 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`,
        'HTTP-Referer': 'http://localhost:4200',
        'X-Title': 'CalmSphere Chatbot',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-distill-llama-70b:free',
        messages: [
          {
            role: 'system',
            content: `
              Eres un terapeuta especializado en reducir el estrés académico en estudiantes. 
              Tu rol es ayudar únicamente con temas relacionados al bienestar mental, ansiedad, concentración y técnicas de relajación para estudiantes. 
              Responde siempre en idioma español. 
              Si la pregunta es sencilla, responde con frases breves y directas. Si requiere explicación, ofrece una respuesta clara pero lo más corta posible.
              No respondas preguntas fuera de este contexto bajo ninguna circunstancia.
            `,
          },
          {
            role: 'user',
            content: mensaje,
          },
        ],
        temperature: 0.7,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Respuesta inválida del servidor');
        return res.json();
      })
      .then((data) => {
        console.log('📦 Respuesta completa de la IA:', data);

        let respuesta =
          'No se recibió una respuesta válida. Por favor, intenta enviar tu mensaje nuevamente.';

        if (data?.choices?.length > 0) {
          const choice = data.choices[0];
          respuesta = choice.message?.content || choice.text || respuesta;
        }

        this.mensajes.push({ autor: 'Bot', texto: respuesta });
      })
      .catch(async (error) => {
        console.error('❌ Error de conexión con la IA:', error);
        this.mensajes.push({
          autor: 'Bot',
          texto:
            'La IA está recibiendo demasiadas solicitudes en este momento. Por favor, intenta en unos minutos.',
        });
      })
      .finally(() => {
        this.cargando = false;
      });
  }
}
